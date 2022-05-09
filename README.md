# Full Stack Web Application

The following project was built using Laravel for the backend and React for the frontend. The website has authentication embedded and all routes are secured through a CORS middleware. Additionally, authorization is implemented as well through different user roles. A normal person entering the website can create an account, login, create/edit/delete a post (which belongs to them), create/edit/delete a comment (which belongs to them) and also receive notifications whenever someone interacts with their post or comment. Compared to a normal user, an admin can edit or delete any item regardless of wheter it belongs to them or not.

Docker Desktop needs to be installed together with WSL2 as prerequisites.

To run the project enter the following command:

```shell
./vendor/bin/sail up
```

A couple of other commands that need to be run as a setup when the project is running are :

```shell
sail npm install
sail npm run dev
sail artisan migrate:refresh --seed
sail artisan passport:install --force
```
