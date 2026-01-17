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
                // Usamos npm ci para garantir uma instalação limpa no CI
                sh 'npm ci'
            }
        }

        stage('Testes') {
            steps {
                sh 'ls -la "./tests"'
                // 1. Verificamos se estamos na pasta certa
                sh 'pwd'
                
                // 2. Rodamos o comando apontando diretamente para a pasta de testes
                // Usamos aspas duplas para evitar problemas com o espaço no nome "All Tests"
                sh 'npx playwright test ./tests --reporter=list'
            }
        }
    }

    post {
        always {
            // Garante que o relatório seja salvo
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }
    }
}