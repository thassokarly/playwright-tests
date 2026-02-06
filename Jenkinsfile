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

        // ❗ NÃO MEXER
        stage('Executar testes') {
            steps {
                sh 'npx playwright test || true'
                allure includeProperties: false,
                       jdk: '',
                       resultPolicy: 'LEAVE_AS_IS',
                       results: [[path: 'allure-results']]
            }
        }
    }

    // ✅ AQUI entra o post
    post {
        always {
            emailext(
                subject: "Playwright - ${currentBuild.currentResult}",
                body: """
                Pipeline executado automaticamente.

                Status: ${currentBuild.currentResult}

                Relatório Allure:
                ${BUILD_URL}allure
                """,
                to: "thassokmorais@gmail.com"
            )
        }
    }
}
