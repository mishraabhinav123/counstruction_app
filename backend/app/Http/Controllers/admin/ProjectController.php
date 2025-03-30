<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TempImage;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;

class ProjectController extends Controller
{
    // This method will return all projects
    public function index()
    {
        $projects = Project::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }

    // This method will insert a projects in db

    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        $model = new Project();
        $model->title = $request->title;
        $model->slug = Str::slug($request->slug);
        $model->short_desc = $request->short_desc;
        $model->content = $request->content;
        $model->construction_type = $request->construction_type;
        $model->sector = $request->sector;
        $model->location = $request->location;
        $model->status = $request->status;
        $model->save();

        // Save Temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                // Create small thumbnail here
                $fileName =  strtotime('now') . $model->id . ' . ' . $ext;
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/projects/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);


                // Create large thumbnail here
                $fileName =  strtotime('now') . $model->id . ' . ' . $ext;
                $destPath = public_path('uploads/projects/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $model->image = $fileName;
                $model->save();
            }
        }

        return response()->json([
            'status' => true,
            'massage' => 'Project added successfully.'
        ]);
    }

    public function show($id)
    {
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Project not found.'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }
    // This method will project update
    public function update($id, Request $request)
    {
        $model =  Project::find($id);
        if ($model == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Project not found.'
            ]);
        }
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,' . $id . ',id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 400);
        }


        $model->title = $request->title;
        $model->slug = Str::slug($request->slug);
        $model->short_desc = $request->short_desc;
        $model->content = $request->content;
        $model->construction_type = $request->construction_type;
        $model->sector = $request->sector;
        $model->location = $request->location;
        $model->status = $request->status;
        $model->save();

        // Save Temp image here

        if ($request->imageId > 0) {
            $oldImage = $model->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                // Create small thumbnail here
                $fileName =  strtotime('now') . $model->id . ' . ' . $ext;
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/projects/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);


                // Create large thumbnail here
                $fileName =  strtotime('now') . $model->id . ' . ' . $ext;
                $destPath = public_path('uploads/projects/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $model->image = $fileName;
                $model->save();

                if ($oldImage != '') {
                    File::delete(public_path('uploads/projects/large/' . $oldImage));
                    File::delete(public_path('uploads/projects/small/' . $oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'massage' => 'Project updated successfully.'
        ]);
    }

    public function destroy($id)
    {
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Project not found.'
            ]);
        }
        File::delete(public_path('uploads/projects/large/' . $project->image));
        File::delete(public_path('uploads/projects/small/' . $project->image));
        $project->delete();

        return response()->json([
            'status' => true,
            'massage' => 'Project deleted successfully.'
        ]);
    }
}
