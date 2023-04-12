## Product CRUD With PHP RESTful API and React

```
scandiweb-task
├─ backend
│  ├─ .env
│  ├─ .env.example
│  ├─ composer.json
│  ├─ config.php
│  ├─ db-schema.png
│  ├─ index.php
│  ├─ README.md
│  ├─ scanditask.sql
│  ├─ src
│  │  ├─ Controllers
│  │  │  └─ ProductController.php
│  │  ├─ Database
│  │  │  └─ DatabaseConnection.php
│  │  ├─ Interfaces
│  │  │  └─ ProductInterface.php
│  │  ├─ Repositories
│  │  │  └─ ProductRepository.php
│  │  ├─ Router
│  │  │  └─ Router.php
│  │  └─ Validators
│  │     └─ Validator.php
│  └─ vendor
│     ├─ autoload.php
│     └─ composer
│        ├─ autoload_classmap.php
│        ├─ autoload_namespaces.php
│        ├─ autoload_psr4.php
│        ├─ autoload_real.php
│        ├─ autoload_static.php
│        ├─ ClassLoader.php
│        └─ LICENSE
├─ frontend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  ├─ src
│  │  ├─ App.tsx
│  │  ├─ components
│  │  │  ├─ Circle.tsx
│  │  │  ├─ ErrorBar.tsx
│  │  │  ├─ form
│  │  │  │  ├─ Book.tsx
│  │  │  │  ├─ Dvd.tsx
│  │  │  │  ├─ Furniture.tsx
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ Name.tsx
│  │  │  │  ├─ Price.tsx
│  │  │  │  ├─ Sku.tsx
│  │  │  │  └─ Type.tsx
│  │  │  ├─ Loading.tsx
│  │  │  ├─ Property.tsx
│  │  │  ├─ SingleProduct.tsx
│  │  │  └─ SuccessBar.tsx
│  │  ├─ constants
│  │  │  ├─ api.tsx
│  │  │  ├─ defaultInputErrors.tsx
│  │  │  └─ defaultInputs.tsx
│  │  ├─ index.css
│  │  ├─ index.tsx
│  │  ├─ pages
│  │  │  ├─ CreateProduct.tsx
│  │  │  ├─ Layout.tsx
│  │  │  └─ ListProducts.tsx
│  │  ├─ types
│  │  │  ├─ CreateProductErrors.tsx
│  │  │  ├─ ProductFields.tsx
│  │  │  └─ ProductType.tsx
│  │  └─ utils
│  │     └─ validateProductInputs.tsx
│  ├─ tailwind.config.js
│  └─ tsconfig.json
└─ README.md

```