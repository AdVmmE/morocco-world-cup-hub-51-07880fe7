
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\UserController;
use App\Http\Controllers\API\V1\StadiumController;
use App\Http\Controllers\API\V1\MatchController;
use App\Http\Controllers\API\V1\TicketController;
use App\Http\Controllers\API\V1\NewsController;
use App\Http\Controllers\API\V1\HostCityController;
use App\Http\Controllers\API\V1\UserTicketController;
use App\Http\Controllers\API\V1\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public authentication routes
Route::prefix('v1')->group(function () {
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    
    // Public data routes (no authentication required)
    Route::get('/stadiums', [StadiumController::class, 'index']);
    Route::get('/stadiums/{stadium}', [StadiumController::class, 'show']);
    Route::get('/stadiums/{stadium}/matches', [StadiumController::class, 'matches']);
    
    Route::get('/matches', [MatchController::class, 'index']);
    Route::get('/matches/{match}', [MatchController::class, 'show']);
    Route::get('/matches/stadium/{stadium}', [MatchController::class, 'byStadium']);
    Route::get('/matches/team/{team}', [MatchController::class, 'byTeam']);
    Route::get('/matches/date-range', [MatchController::class, 'byDateRange']);
    
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{news}', [NewsController::class, 'show']);
    Route::get('/news/category/{category}', [NewsController::class, 'byCategory']);
    Route::get('/news/search', [NewsController::class, 'search']);
    
    Route::get('/host-cities', [HostCityController::class, 'index']);
    Route::get('/host-cities/{hostCity}', [HostCityController::class, 'show']);
    
    Route::get('/tickets/match/{match}', [TicketController::class, 'byMatch']);
});

// Protected routes (authentication required)
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    // User authentication
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::put('/auth/user', [AuthController::class, 'updateProfile']);
    
    // User ticket management
    Route::get('/user/tickets', [UserTicketController::class, 'index']);
    Route::post('/tickets/{ticket}/book', [UserTicketController::class, 'book']);
    Route::get('/user/tickets/{userTicket}', [UserTicketController::class, 'show']);
    Route::delete('/user/tickets/{userTicket}', [UserTicketController::class, 'cancel']);
});

// Admin only routes
Route::prefix('v1/admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    // Stadium management
    Route::post('/stadiums', [StadiumController::class, 'store']);
    Route::put('/stadiums/{stadium}', [StadiumController::class, 'update']);
    Route::delete('/stadiums/{stadium}', [StadiumController::class, 'destroy']);
    
    // Match management
    Route::post('/matches', [MatchController::class, 'store']);
    Route::put('/matches/{match}', [MatchController::class, 'update']);
    Route::delete('/matches/{match}', [MatchController::class, 'destroy']);
    
    // News management
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{news}', [NewsController::class, 'update']);
    Route::delete('/news/{news}', [NewsController::class, 'destroy']);
    
    // Ticket management
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::put('/tickets/{ticket}', [TicketController::class, 'update']);
    Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy']);
    
    // Host city management
    Route::post('/host-cities', [HostCityController::class, 'store']);
    Route::put('/host-cities/{hostCity}', [HostCityController::class, 'update']);
    Route::delete('/host-cities/{hostCity}', [HostCityController::class, 'destroy']);
    
    // User management
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    
    // Admin analytics
    Route::get('/analytics/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/analytics/ticket-sales', [AdminController::class, 'ticketSales']);
    Route::get('/analytics/stadium-progress', [AdminController::class, 'stadiumProgress']);
});
