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
                // Executa os testes normalmente
                sh 'npx playwright test'
                currentBuild.result = 'SUCCESS' 
            } catch (err) {
                echo "Testes falharam, mas forçando status para SUCCESS conforme solicitado."
                // Força o resultado do build atual para Sucesso
                currentBuild.result = 'SUCCESS'
            }
        }
        // O Allure continuará gerando o report com as falhas, mas o status do Job será verde
        allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
    }
}
    }
}
