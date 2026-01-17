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
                // ALTERAÇÃO AQUI: Adicionado --reporter=list para forçar a saída no log
                sh 'npx playwright test --reporter=list'
            }
        }
    }

    // ALTERAÇÃO AQUI: Salva o relatório HTML mesmo se os testes falharem
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }
    }
}