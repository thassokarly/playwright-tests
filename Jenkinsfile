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
                // Usamos aspas simples por fora e aspas duplas por dentro para o caminho com espaço
                // Também adicionamos o comando 'DEBUG=pw:config' para ver se ele ignora o config
                sh "npx playwright test"
            }
        }
    }

    post {
        always {
            // Se o Playwright não gerou o HTML, tentamos capturar o que houver
            archiveArtifacts artifacts: '**/*.html, **/test-results/**', allowEmptyArchive: true
        }
    }
}