pipeline {
    agent {
        docker {
            image 'papitodev/playwright-nj-v1.49.1-noble'
            args '--network teste_skynet'
        }
    }

    triggers {
    cron('50 17 * * *')
    }


    stages {
        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        // ❗️NÃO MEXER (como você pediu)
        stage('Executar testes') {
            steps {
                sh 'npx playwright test || true'
                allure includeProperties: false,
                       jdk: '',
                       resultPolicy: 'LEAVE_AS_IS',
                       results: [[path: 'allure-results']]
            }
        }

        stage('Compactar relatório') {
            steps {
                sh 'zip -r allure-report.zip allure-report'
            }
        }
    }

    post {
        always {
            emailext(
                subject: "Relatório Playwright - ${currentBuild.currentResult}",
                body: """
                Pipeline executado automaticamente.

                Status: ${currentBuild.currentResult}
                Job: ${JOB_NAME}
                Build: ${BUILD_NUMBER}

                Link do build:
                ${BUILD_URL}

                Relatório Allure em anexo.
                """,
                to: "SEUEMAIL@gmail.com",
                attachmentsPattern: "allure-report.zip"
            )
        }
    }
}
