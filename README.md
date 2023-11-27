# React GitHub Repositories Viewer

This React application displays a list of repositories in a table view, specifically focusing on React-related repositories.

## Testing the Application

To ensure a seamless testing experience, our application supports two primary methods: Docker-based testing and local environment setup. Choose the method that best fits your testing environment and preferences.

#### 1. Docker-Based Testing

1. Pull the Docker Image

```
   docker pull olegsyrbu/90poe
```

2. Run the Container:

```
   docker run -dp 127.0.0.1:3000:3000 olegsyrbu/90poe
```

Access the application at http://127.0.0.1:3000.

#### 2. Local Environment Setup

1. In the root directory of your project, create a `.env` file.

2. GitHub Token Generation, Navigate to GitHub Token Settings (https://github.com/settings/tokens) and generate a new personal access token with the required permissions.

3. Token Configuration, Insert your GitHub token into the `.env` file in the following format:

   ```
   REACT_APP_GITHUB_TOKEN=<Your_Github_Token>
   ```

#####

#### Installation and Running the Application

1. Install the necessary dependencies:

   ```
   npm install
   ```

2. Start the application:

   ```
   npm start
   ```

   The application should now be running on http://localhost:3000

3. Check tests:

   ```
   npm run tests
   ```

   #### happy coding
