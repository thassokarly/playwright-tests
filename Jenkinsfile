pipeline {
    agent {
        docker {
            image 'papitodev/playwright-nj-v1.49.1-noble'
            args '--network teste_skynet'
        }
    }
    triggers {
    cron('0 18 * * *')
    }
    stages {
        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Executar testes') {
            steps {
                sh 'npx playwright test || true'
                allure includeProperties: false, jdk: '', resultPolicy: 'LEAVE_AS_IS', results: [[path: 'allure-results']]
            }
        }
    }
}
