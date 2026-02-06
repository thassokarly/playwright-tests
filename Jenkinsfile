pipeline {
    agent {
        docker {
            image 'papitodev/playwright-nj-v1.49.1-noble'
            args '--network teste_skynet'
        }
    }
    triggers {
        cron('0 12 * * *') // ajusta conforme necessidade
    }

    stages {
        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Executar testes') {
            steps {
                script {
                    try {
                        sh 'npx playwright test --reporter=list'
                    } catch (err) {
                        echo "Alguns testes falharam propositalmente, mas estamos ignorando a falha."
                    }
                }
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}
