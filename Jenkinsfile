pipeline {
    agent any

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