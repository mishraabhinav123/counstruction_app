<?php

use App\Http\Controllers\admin\ArticleController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\MemberController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\admin\TestimonialController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\front\ArticleController as FrontArticleController;
use App\Http\Controllers\front\ContactController;
use App\Http\Controllers\front\MemberController as FrontMemberController;
use App\Http\Controllers\front\ProjectController as FrontProjectController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use App\Http\Controllers\front\TestimonialController as FrontTestimonialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('authenticate', [AuthenticationController::class, 'authenticate']);
Route::get('get-services', [FrontServiceController::class, 'index']);
Route::get('get-service/{id}', [FrontServiceController::class, 'service']);
Route::get('get-latest-services', [FrontServiceController::class, 'latestServices']);
Route::get('get-projects', [FrontProjectController::class, 'index']);
Route::get('get-project/{id}', [FrontProjectController::class, 'project']);
Route::get('get-latest-projects', [FrontProjectController::class, 'latestProject']);
Route::get('get-articles', [FrontArticleController::class, 'index']);
Route::get('get-article/{id}', [FrontArticleController::class, 'article']);
Route::get('get-latest-articles', [FrontArticleController::class, 'latestArticles']);
Route::get('get-testimonials', [FrontTestimonialController::class, 'index']);
Route::get('get-latest-testimonials', [FrontTestimonialController::class, 'latestTestimonials']);
Route::get('get-members', [FrontMemberController::class, 'index']);
Route::post('contact-now', [ContactController::class, 'index']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => ['auth:sanctum']], function () {
    // protected Routes
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('logout', [AuthenticationController::class, 'logout']);

    // Services Route
    Route::post('services', [ServiceController::class, 'store']);
    Route::get('services', [ServiceController::class, 'index']);
    Route::put('services/{id}', [ServiceController::class, 'update']);
    Route::get('services/{id}', [ServiceController::class, 'show']);
    Route::delete('services/{id}', [ServiceController::class, 'destroy']);

    // Projects Route
    Route::get('projects', [ProjectController::class, 'index']);
    Route::get('project/{id}', [ProjectController::class, 'show']);
    Route::post('project', [ProjectController::class, 'store']);
    Route::put('project/{id}', [ProjectController::class, 'update']);
    Route::delete('project/{id}', [ProjectController::class, 'destroy']);

    // Articles Route
    Route::get('article', [ArticleController::class, 'index']);
    Route::get('article/{id}', [ArticleController::class, 'show']);
    Route::post('article', [ArticleController::class, 'store']);
    Route::put('article/{id}', [ArticleController::class, 'update']);
    Route::delete('article/{id}', [ArticleController::class, 'destroy']);

    // Testimonials Route
    Route::get('testimonial', [TestimonialController::class, 'index']);
    Route::get('testimonial/{id}', [TestimonialController::class, 'show']);
    Route::post('testimonial', [TestimonialController::class, 'store']);
    Route::put('testimonial/{id}', [TestimonialController::class, 'update']);
    Route::delete('testimonial/{id}', [TestimonialController::class, 'destroy']);

    // Member Route
    Route::get('member', [MemberController::class, 'index']);
    Route::get('member/{id}', [MemberController::class, 'show']);
    Route::post('member', [MemberController::class, 'store']);
    Route::put('member/{id}', [MemberController::class, 'update']);
    Route::post('member/{id}', [MemberController::class, 'destroy']);

    // Temp images routes
    Route::post('temp-images', [TempImageController::class, 'store']);
});
