pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
        }
    }

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm install'
            }
        }

        stage('Testes') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
