
# Morocco World Cup 2030 - Laravel API

A comprehensive Laravel 12 API system for the Morocco World Cup 2030 website, providing complete backend functionality for stadium management, match scheduling, ticket booking, news management, and user authentication.

## Features

- **User Authentication** - Register, login, profile management with Laravel Sanctum
- **Stadium Management** - CRUD operations for World Cup stadiums
- **Match Scheduling** - Complete match management with teams, dates, and results
- **Ticket Booking** - Multi-category ticket system with availability tracking
- **News Management** - Content management for World Cup news and updates
- **Host Cities** - Information management for Moroccan host cities
- **Admin Dashboard** - Administrative functions and analytics
- **API Versioning** - Clean v1 API structure with proper resource formatting

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel-api
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**
   ```bash
   # Create database
   mysql -u root -p
   CREATE DATABASE morocco_worldcup_2030;
   exit

   # Run migrations
   php artisan migrate

   # Or import the complete SQL file
   mysql -u root -p morocco_worldcup_2030 < database.sql
   ```

5. **Start the server**
   ```bash
   php artisan serve
   ```

## API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout (requires auth)
- `GET /api/v1/auth/user` - Get authenticated user (requires auth)
- `PUT /api/v1/auth/user` - Update user profile (requires auth)
- `POST /api/v1/auth/forgot-password` - Password reset

### Public Endpoints

- `GET /api/v1/stadiums` - List all stadiums
- `GET /api/v1/stadiums/{id}` - Get stadium details
- `GET /api/v1/matches` - List all matches
- `GET /api/v1/matches/{id}` - Get match details
- `GET /api/v1/news` - List all news articles
- `GET /api/v1/host-cities` - List all host cities

### Protected Endpoints (Require Authentication)

- `GET /api/v1/user/tickets` - User's ticket bookings
- `POST /api/v1/tickets/{id}/book` - Book tickets
- `DELETE /api/v1/user/tickets/{id}` - Cancel booking

### Admin Endpoints (Require Admin Role)

- `POST /api/v1/admin/stadiums` - Create stadium
- `PUT /api/v1/admin/stadiums/{id}` - Update stadium
- `DELETE /api/v1/admin/stadiums/{id}` - Delete stadium
- `GET /api/v1/admin/analytics/dashboard` - Admin dashboard stats

## Database Schema

The system includes the following main entities:

- **Users** - Authentication and user management
- **Stadiums** - World Cup venue information
- **Matches** - Match scheduling and results
- **Tickets** - Ticket categories and pricing
- **UserTickets** - User ticket bookings
- **News** - News articles and updates
- **HostCities** - Moroccan host city information

## Authentication

The API uses Laravel Sanctum for authentication. Include the Bearer token in the Authorization header:

```
Authorization: Bearer your-token-here
```

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  },
  "meta": {
    // Pagination info (for paginated responses)
  }
}
```

## Filtering and Pagination

Most list endpoints support filtering, searching, and pagination:

- `?search=query` - Search functionality
- `?category=value` - Filter by category
- `?sort=field&direction=asc|desc` - Sorting
- `?per_page=15` - Pagination

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error

## Sample Usage

### Register a new user
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### Get stadiums with filters
```bash
curl "http://localhost:8000/api/v1/stadiums?city=Casablanca&status=Operational"
```

### Book tickets (requires authentication)
```bash
curl -X POST http://localhost:8000/api/v1/tickets/1/book \
  -H "Authorization: Bearer your-token-here" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 2,
    "owner_name": "John Doe",
    "owner_email": "john@example.com"
  }'
```

## Security Features

- Password hashing with bcrypt
- API rate limiting
- CORS configuration
- Input validation and sanitization
- SQL injection prevention
- Role-based access control

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
