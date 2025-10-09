// Script para ejecutar todos los tests de Postman automáticamente
// Uso: node test-runner.js

const newman = require('newman');
const fs = require('fs');
const path = require('path');

const collectionPath = './Obligatorio-FS-310665-336194.postman_collection.json';

// Configuración del entorno
const environment = {
    "id": "test-env",
    "name": "Test Environment",
    "values": [
        {
            "key": "dev_base_url",
            "value": "http://localhost:3000/api/v1",
            "enabled": true
        }
    ]
};

console.log('🚀 Iniciando ejecución de tests de Postman...\n');

newman.run({
    collection: collectionPath,
    environment: environment,
    reporters: ['cli', 'htmlextra'],
    reporter: {
        htmlextra: {
            export: './test-results.html',
            title: 'Obligatorio Full Stack - Test Results',
            browserTitle: 'Test Results - Obligatorio 310665-336194',
            showOnlyFails: false,
            logs: true,
            omitHeaders: false,
            omitRequestBodies: false,
            omitResponseBodies: false,
            hideRequestBody: [],
            hideResponseBody: [],
            showEnvironmentData: true,
            skipGlobalVars: false,
            skipSensitiveData: false,
            showMarkdownLinks: true,
            noSyntaxHighlighting: false,
            showFolderDescription: true,
            timezone: "America/Montevideo"
        }
    },
    iterationCount: 1,
    delayRequest: 500, // 500ms entre requests
    timeout: 30000 // 30 segundos timeout
}, function (err, summary) {
    if (err) {
        console.error('❌ Error ejecutando la colección:', err);
        process.exit(1);
    }
    
    console.log('\n📊 RESUMEN DE EJECUCIÓN:');
    console.log('═══════════════════════════════════════════');
    console.log(`📁 Colección: ${summary.collection.name}`);
    console.log(`🔢 Total de requests: ${summary.run.stats.requests.total}`);
    console.log(`✅ Requests exitosos: ${summary.run.stats.requests.total - summary.run.stats.requests.failed}`);
    console.log(`❌ Requests fallidos: ${summary.run.stats.requests.failed}`);
    console.log(`🧪 Total de tests: ${summary.run.stats.tests.total}`);
    console.log(`✅ Tests pasados: ${summary.run.stats.tests.passed}`);
    console.log(`❌ Tests fallidos: ${summary.run.stats.tests.failed}`);
    console.log(`⏰ Tiempo total: ${summary.run.timings.completed - summary.run.timings.started}ms`);
    
    if (summary.run.failures.length > 0) {
        console.log('\n🚨 FALLOS DETECTADOS:');
        console.log('═══════════════════════════════════════════');
        summary.run.failures.forEach((failure, index) => {
            console.log(`\n${index + 1}. ${failure.source.name || 'Request sin nombre'}`);
            console.log(`   Error: ${failure.error.message}`);
            if (failure.error.test) {
                console.log(`   Test: ${failure.error.test}`);
            }
        });
    }
    
    console.log('\n📄 Reporte HTML generado: test-results.html');
    console.log('═══════════════════════════════════════════\n');
    
    // Exit code basado en si hubo fallos
    process.exit(summary.run.stats.tests.failed > 0 ? 1 : 0);
});