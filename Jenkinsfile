pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.0-noble'
            args '--network teste_skynet'
        }
    }

    stages {
        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Executar testes') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
