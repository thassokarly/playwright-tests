pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
            args '--network teste_skynet'
        }
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Executar testes Playwright') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

post {
    always {
        echo '📄 Arquivando relatório do Playwright'
        archiveArtifacts artifacts: 'playwright-report/**',
                         fingerprint: true,
                         allowEmptyArchive: true
    }

    success {
        echo '✅ Todos os testes passaram'
    }

    failure {
        echo '❌ Existem testes com falha'
    }
}
}
