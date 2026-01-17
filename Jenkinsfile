pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
            // Mantendo sua rede customizada
            args '--network teste_skynet'
        }
    }

    environment {
        // Força o Playwright a colorir o log, o que ajuda o Jenkins a exibir o texto
        FORCE_COLOR = '1'
    }

    stages {
        stage('Node.js Deps') {
            steps {
                // 'npm ci' é preferível em CI por ser mais rápido e limpo que o 'npm install'
                sh 'npm ci'
            }
        }

        stage('Testes') {
            steps {
                // Executa os testes apontando para a pasta 'tests'
                // --reporter=list garante que cada teste apareça no log do console
                sh 'npx playwright test ./tests --reporter=list'
            }
        }
    }

    post {
        always {
            // Salva o relatório HTML e os resultados (fotos/vídeos) no Jenkins
            // Isso permite que você veja o que aconteceu mesmo após o container ser removido
            archiveArtifacts artifacts: 'playwright-report/**/*, test-results/**/*', allowEmptyArchive: true
        }
    }
}