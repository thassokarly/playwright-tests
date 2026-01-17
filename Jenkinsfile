pipeline {
    agent {
        docker{
            image 'mcr.microsoft.com/playwright:v1.57.0-noble' //container dock
            args '--network teste_skynet' //com essa rede
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
                sh 'npx playwright test --reporter=list'
            }
        }
        
    }
}
