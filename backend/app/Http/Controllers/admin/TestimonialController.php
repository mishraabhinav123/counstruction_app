<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use App\Models\Testimonial;
use Egulias\EmailValidator\Warning\TLD;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class TestimonialController extends Controller
{
    // This method will return all testimonials
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $testimonials
        ], 200);
    }

    // This method will return single testimonials
    public function show($id)
    {
        $testimonial = Testimonial::find($id);

        if ($testimonial == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Testimonials not found'
            ], 404);
        }
        return response()->json([
            'status' => true,
            'data' => $testimonial,
        ]);
    }

    // This method will insert testimonials in db
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required',
            'designation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        $testimonial = new Testimonial();
        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation  = $request->citation;
        $testimonial->designation = $request->designation;
        $testimonial->status = $request->status;
        $testimonial->save();

        // Save Temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                // Create small thumbnail here
                $fileName =  strtotime('now') . $testimonial->id . ' . ' . $ext;
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/testimonials/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destPath);
                $testimonial->image = $fileName;
                $testimonial->save();
            }
        }
        return response()->json([
            'status' => true,
            'massage' => 'Testimonial added successfully.'
        ]);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);
        if ($testimonial == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Testimonial not found.'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation  = $request->citation;
        $testimonial->status = $request->status;
        $testimonial->save();

        // Save Temp image here

        if ($request->imageId > 0) {
            $oldImage = $testimonial->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                // Create small thumbnail here
                $fileName =  strtotime('now') . $testimonial->id . ' . ' . $ext;
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/testimonials/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destPath);
                $testimonial->image = $fileName;
                $testimonial->save();

                if ($oldImage != '') {
                    File::delete(public_path('uploads/testimonials/' . $oldImage));
                }
            }
        }
        return response()->json([
            'status' => true,
            'massage' => 'Testimonial updated successfully.'
        ]);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);
        if ($testimonial == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Testimonial not found.'
            ], 404);
        }
        if ($testimonial->image != '') {
            File::delete(public_path('uploads/testimonials/' . $testimonial->image));
        }
        $testimonial->delete();
        return response()->json([
            'status' => true,
            'massage' => 'Testimonial deleted successfully.'
        ], 200);
    }
}
