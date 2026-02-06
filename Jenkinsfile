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
                sh 'npm ci' // ci é mais confiável que install em CI/CD
            }
        }

        stage('Executar testes') {
            steps {
                script {
                    // Roda os testes e captura o código de saída
                    def status = sh(script: 'npx playwright test --reporter=allure-playwright', returnStatus: true)
                    echo "Código de saída do Playwright: ${status}"

                    // Coleta os resultados do Allure mesmo que haja falha
                    allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]

                    // Decide se o pipeline deve falhar
                    if (status != 0) {
                        error("Alguns testes falharam. Código de saída: ${status}")
                    }
                }
            }
        }
    }
}
