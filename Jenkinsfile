pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
            args '--network teste_skynet'
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
        stage('Teste') {
            steps {
        // Adicionamos o --list para ver se ele reconhece os arquivos
                sh 'npx playwright test --reporter=list'
            }
        }
    }
}
