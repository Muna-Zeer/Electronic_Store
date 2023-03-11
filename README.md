# Electronic_Store
### This is an electronic store application built with Laravel for the backend and ReactJS for the frontend. The database is built using MySQL and the application features access control for users and administrators. Administrators have the ability to perform CRUD operations on products and categories, as well as observe customer orders. Users are able to view products, browse categories, add items to their cart, and checkout their purchases.

## Installation
1. Clone the repository
```
git clone https://github.com/Muna-Zeer/Electronic_Store.git
```

2. Install dependencies with composer install and npm install

```
cd electronic-store
cd backend
composer install
cd frontend
npm install
```
3. Copy the .env.example file to .env and set up the database connection

```
cp .env.example .env
```

Edit the .env file and update the following lines with your database information:

```
DB_DATABASE=electronicstore
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

4. Generate a new application key
```
 php artisan key:generate
```

5. Run migrations with php artisan migrate
```
php artisan migrate
```
6. Start the development server with php artisan serve
```
cd backend
php artisan serve

```
7. Start the development client
```
cd frontend
npm start
```



## Usage
* To access the application as an administrator, navigate to /admin and log in with the provided credentials.

* To access the application as a regular user, simply navigate to the homepage and browse products and categories.

* To checkout, simply click the "Checkout" button in the cart and provide the necessary information.

* Administrators can perform CRUD operations on products and categories by navigating to the appropriate section in the admin dashboard.