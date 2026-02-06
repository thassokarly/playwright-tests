pipeline {
    agent {
        docker {
            image 'papitodev/playwright-nj-v1.49.1-noble'
            args '--network teste_skynet'
        }
    }

    triggers {
        cron('18 18 * * *')
    }

    stages {
        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Executar testes') {
            steps {
                // O "|| true" garante que o pipeline continue mesmo se testes falharem
                // para que o relatório seja gerado
                sh 'npx playwright test || true' 
                
                allure includeProperties: false, 
                       jdk: '', 
                       resultPolicy: 'LEAVE_AS_IS', 
                       results: [[path: 'allure-results']]
            }
        }
    }

    // --- BLOCO ADICIONADO ---
    post {
        always {
            script {
                // Define a URL do relatório Allure baseada na URL do Build
                def allureReportUrl = "${BUILD_URL}allure/"
                
                // Envia o e-mail
                emailext (
                    from: 'thassokmorais@gmail.com',
                    to: 'thassokmorais@gmail.com',
                    subject: "Relatório de Testes Playwright - Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                    body: """
                        <html>
                        <body>
                            <h2>Execução de Testes Finalizada</h2>
                            <p><strong>Status:</strong> ${currentBuild.currentResult}</p>
                            <p><strong>Build:</strong> #${env.BUILD_NUMBER}</p>
                            <hr>
                            <p>O relatório detalhado do Allure está disponível no link abaixo:</p>
                            <h3><a href="${allureReportUrl}">Clique aqui para ver o Relatório Allure</a></h3>
                            <br>
                            <small>Este e-mail foi enviado automaticamente pelo Jenkins.</small>
                        </body>
                        </html>
                    """,
                    mimeType: 'text/html'
                )
            }
        }
    }
}