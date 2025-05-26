
<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Stadium;
use App\Models\Match;
use App\Models\UserTicket;
use App\Models\News;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_users' => User::where('role', 'user')->count(),
            'total_stadiums' => Stadium::count(),
            'total_matches' => Match::count(),
            'total_tickets_sold' => UserTicket::where('status', 'active')->sum('quantity'),
            'total_revenue' => UserTicket::where('status', 'active')->sum('total_price'),
            'recent_registrations' => User::where('created_at', '>=', now()->subDays(30))->count(),
            'active_bookings' => UserTicket::where('status', 'active')->count(),
            'total_news_articles' => News::count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    public function ticketSales(Request $request)
    {
        $period = $request->get('period', '30'); // days

        $sales = UserTicket::where('status', 'active')
                          ->where('created_at', '>=', now()->subDays($period))
                          ->selectRaw('DATE(created_at) as date, COUNT(*) as tickets_sold, SUM(total_price) as revenue')
                          ->groupBy('date')
                          ->orderBy('date')
                          ->get();

        return response()->json([
            'success' => true,
            'data' => $sales
        ]);
    }

    public function stadiumProgress()
    {
        $stadiums = Stadium::select('name', 'city', 'status', 'progress')
                          ->orderBy('progress', 'desc')
                          ->get();

        return response()->json([
            'success' => true,
            'data' => $stadiums
        ]);
    }
}
