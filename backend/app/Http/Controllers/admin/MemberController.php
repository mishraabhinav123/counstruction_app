<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class MemberController extends Controller
{
    // This method will return all members
    public function index()
    {
        $members = Member::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }
    // This method will return single members
    public function show($id)
    {
        $member = Member::find($id);
        if ($member == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Member not found.'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $member
        ], 200);
    }

    // This method will store member in db
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $member = new Member();
        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        // Save Temp image here
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                // Create small thumbnail here
                $fileName =  strtotime('now') . $member->id . ' . ' . $ext;
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/members/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(400, 500);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();
            }
        }

        return response()->json([
            'status' => true,
            'massage' => 'Member Added Successfully.'
        ]);
    }
    // This method will update member in db
    public function update($id, Request $request)
    {
        $member = Member::find($id);
        if ($member == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Member not found.'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        // Save Temp image here
        if ($request->imageId > 0) {
            $oldImage = $member->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                // Create small thumbnail here
                $fileName =  strtotime('now') . $member->id . ' . ' . $ext;
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/members/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(400, 500);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();
                if ($oldImage != '') {
                    File::delete(public_path('uploads/members/' . $oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'massage' => 'Member Updated Successfully.'
        ]);
    }

    // This method will delete member in db
    public function destroy($id)
    {
        $member = Member::find($id);
        if ($member == null) {
            return response()->json([
                'status' => false,
                'massage' => 'Member not found.'
            ], 404);
        }
        if ($member->image != '') {
            File::delete(public_path('uploads/members/' . $member->image));
        }
        $member->delete();
        return response()->json([
            'status' => true,
            'massage' => 'Member Deleted successfully.'
        ], 200);
    }
}
