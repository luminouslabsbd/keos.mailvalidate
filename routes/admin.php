<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\DomainController;
use App\Http\Controllers\Admin\KickboxController;
use App\Http\Controllers\Admin\ProjectController;

Route::get('/login',[AuthController::class,'login'])->name('login');
Route::post('/login',[AuthController::class,'loginPost'])->name('login.post');

Route::group(['middleware' => ['auth:admin'],'as' =>'admin.'],function() {


    Route::get('/error',[DashboardController::class,'error'])->name('error');
    Route::get('dashboard', [DashboardController::class, 'adminDashboard'])->name('dashboard');
    Route::get('logout', [AuthController::class, 'logout'])->name('logout');


    Route::group(['prefix' => 'user' ],function (){
        Route::get('/profile', [AdminProfileController::class, 'userProfile'])->name('user.profile');
        Route::post('/profile/update', [AdminProfileController::class, 'userProfileUpdate'])->name('user.profile.update');
        Route::post('/profile/change-password', [AdminProfileController::class, 'userProfileChangePassword'])->name('user.profile.update');

    });

    Route::group(['prefix' => 'domain' ],function (){
        Route::get('/domains', [DomainController::class, 'index'])->name('domains');
        Route::get('/create', [DomainController::class, 'domainCreate'])->name('domain.create');
        Route::post('/store', [DomainController::class, 'domainStore'])->name('domain.store');
        Route::post('/status', [DomainController::class, 'domainStatus'])->name('domain.status');
        Route::delete('/delete/{id}', [DomainController::class, 'domainDelete'])->name('domain.delete');
    });

    Route::group(['prefix'=>'project'],function(){
        Route::get('/index',[ProjectController::class,'projectIndex'])->name('project.index');
        Route::get('/create', [ProjectController::class, 'projectCreate'])->name('project.create');
        Route::post('/store', [ProjectController::class, 'projectStore'])->name('project.store');
        Route::get('/{id}/edit', [ProjectController::class, 'projectEdit'])->name('project.edit');
        Route::post('/update',[ProjectController::class, 'projectUpdate'])->name('project.update');
        Route::post('/status',[ProjectController::class, 'projectStatusUpdate'])->name('project.status');
        Route::get('/delete/{id}', [ProjectController::class, 'projectDelete'])->name('project.delete');
        Route::get("/email-list",[ProjectController::class,'EmailList'])->name('emailList');
        Route::post("/email-status",[ProjectController::class,'emailStatus'])->name('emailStatus');
    });

    Route::group(['prefix'=>'kickbox'],function(){
        Route::get('/index',[KickboxController::class,'kickboxIndex'])->name('kickbox.index');
        Route::get('/create', [KickboxController::class, 'kickboxCreate'])->name('kickbox.create');
        Route::post('/store', [KickboxController::class, 'kickboxStore'])->name('kickbox.store');
        Route::get('/{id}/edit', [KickboxController::class, 'kickboxEdit'])->name('kickbox.edit');
        Route::post('/update',[KickboxController::class, 'kickboxUpdate'])->name('kickbox.update');
        Route::post('/status',[KickboxController::class,'kickboxStatus'])->name('kickbox.status');
        Route::get("/delete/{id}",[KickboxController::class,'kickboxDelete'])->name('kickbox.delete');
    });

});