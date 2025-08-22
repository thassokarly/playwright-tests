const fs = require('fs');
const path = require('path');

const testDir = './tests';
const allCases = JSON.parse(fs.readFileSync('./all-cases.json', 'utf-8'));

// Função para pegar todos os testes no diretório
function getTestFiles(dir) {
  return fs.readdirSync(dir).filter(file => file.endsWith('.spec.ts') || file.endsWith('.spec.js'));
}

// Extrai os nomes dos testes
function extractTestsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /test\(['"`](.+?)['"`],/g;
  const matches = [...content.matchAll(regex)];
  return matches.map(m => m[1]);
}

// Mapeia todos os testes encontrados
let automatedTests = [];
getTestFiles(testDir).forEach(file => {
  const tests = extractTestsFromFile(path.join(testDir, file));
  automatedTests.push(...tests);
});

// Calcula cobertura
const total = allCases.length;
const automated = allCases.filter(t => automatedTests.includes(t)).length;
const coverage = (automated / total) * 100;

console.log('--- Cobertura de Testes ---');
console.log(`Total de casos planejados: ${total}`);
console.log(`Testes automatizados: ${automated}`);
console.log(`Cobertura: ${coverage.toFixed(2)}%`);
console.log('---------------------------');

// Lista detalhada
allCases.forEach(t => {
  console.log(`${t} -> ${automatedTests.includes(t) ? '✅ Automatizado' : '❌ Não automatizado'}`);
});
