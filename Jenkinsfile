pipeline {
    agent {
        docker {
            image 'papitodev/playwright-nj-v1.49.1-noble'
            args '--network teste_skynet'
        }
    }

    triggers {
        cron('0 12 * * *')
    }

    stages {
        stage('Instalar dependências') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Executar testes') {
            steps {
                script {
                    // Roda os testes e captura o código de saída
                    def status = sh(script: 'npx playwright test --reporter=allure-playwright', returnStatus: true)
                    echo "Código de saída do Playwright (simulado ou real): ${status}"

                    // Coleta os resultados do Allure mesmo que haja falha
                    allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]

                    // Não aborta o pipeline, mesmo se houver falha
                    echo "Falha simulada, mas pipeline continua executando normalmente."
                }
            }
        }
    }
}
