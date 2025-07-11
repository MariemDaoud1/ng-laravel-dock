# backend/Dockerfile

FROM php:8.4-apache

# Enable Apache modules
RUN a2enmod rewrite

# Set working dir
WORKDIR /var/www/html

# Install PHP extensions
RUN apt-get update && apt-get install -y \
    zip unzip git curl libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel project
COPY . . 

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Run artisan command AFTER copying project files
RUN php artisan storage:link


# Apache virtual host config
COPY apache/laravel.conf /etc/apache2/sites-available/000-default.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 80
CMD ["apache2-foreground"]