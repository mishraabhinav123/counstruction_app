<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\File;
use Intervention\Image\Drivers\Gd\Driver;

class ArticleController extends Controller
{
    // This  method will fetch all articles

    public function index()
    {
        $articles = Article::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }
    // This  method will insert article in db
    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articles,slug'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        $article = new Article();
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

        // Save Temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                // Create small thumbnail here
                $fileName =  strtotime('now') . $article->id . ' . ' . $ext;
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/articles/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(450, 300);
                $image->save($destPath);


                // Create large thumbnail here
                $fileName =  strtotime('now') . $article->id . ' . ' . $ext;
                $destPath = public_path('uploads/articles/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $article->image = $fileName;
                $article->save();
            }
        }

        return response()->json([
            'status' => true,
            'massage' => 'Article added successfully.'
        ]);
    }

    public function show($id)
    {
        $article = Article::find($id);
        if ($article == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Article not found.'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }

    public function update(Request $request, $id)
    {
        $article =  Article::find($id);
        if ($article == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Article not found.'
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articles,slug,' . $id . ',id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

        // Save Temp image here

        if ($request->imageId > 0) {
            $oldImage = $article->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                // Create small thumbnail here
                $fileName =  strtotime('now') . $article->id . ' . ' . $ext;
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/articles/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(450, 300);
                $image->save($destPath);


                // Create large thumbnail here
                $fileName =  strtotime('now') . $article->id . ' . ' . $ext;
                $destPath = public_path('uploads/articles/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $article->image = $fileName;
                $article->save();

                if ($oldImage != '') {
                    File::delete(public_path('uploads/articles/large/' . $oldImage));
                    File::delete(public_path('uploads/articles/small/' . $oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'massage' => 'Article updated successfully.'
        ]);
    }

    public function destroy($id)
    {
        $article = Article::find($id);
        if ($article == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Article not found.'
            ]);
        }
        File::delete(public_path('uploads/articles/large/' . $article->image));
        File::delete(public_path('uploads/articles/small/' . $article->image));
        $article->delete();

        return response()->json([
            'status' => true,
            'massage' => 'Articles deleted successfully.'
        ]);
    }
}
