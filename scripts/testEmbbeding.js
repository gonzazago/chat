const { Client } = require('@elastic/elasticsearch');
const axios = require('axios');

const es = new Client({
    node: 'http://localhost:9200',
    compatibleWith: 8,
});

const INDEX = 'candidates';

async function searchSemantic(queryText, k = 5) {
    const embedding = await axios
        .post('http://localhost:8000/embed', { text: queryText })
        .then(res => res.data.embedding);

    const result = await es.knnSearch({
        index: INDEX,
        knn: {
            field: 'vector',
            query_vector: embedding,
            k,
            num_candidates: 20,
        },
        // 👇 Esto es lo que te faltaba: pasarlo dentro del body
        _source: ['name', 'lastName', 'skills', 'experience', 'mail'],
    });

    return result.hits.hits;
}

(async () => {
    const matches = await searchSemantic('Senior Backend con AWS y Go', 5);
    console.log('🔍 Mejores candidatos encontrados:\n');
    matches.forEach((hit, i) => {
        const c = hit._source;
        console.log(`${i + 1}. ${c.name} ${c.lastName} - Score: ${hit._score}`);
        console.log(`   Mail: ${c.mail}`);
        console.log(`   Skills: ${c.skills.map(s => s.name).join(', ')}`);
        console.log('');
    });
})();
