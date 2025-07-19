import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { ElasticsearchClient } from '../src/infrastructure/persistence/elasticsearch/ElasticsearchClient';
import { EmbeddingService } from '../src/application/services/impl/EmbeddingService';
import rawCandidates from './candidates.json'; // tu JSON de prueba

interface CandidateRaw {
    id?: string;
    name: string;
    lastName: string;
    age: number;
    mail: string;
    phone: string;
    linkedinUrl: string;
    extract: string;
    skills: { name: string; years: number }[];
    experience: { position: string; init: string; end: string | null; actually: boolean; company: string; description: string }[];
    englishLevel: string;
}

async function preIndex() {
    const esClient = new ElasticsearchClient();
    const embeddingService = new EmbeddingService(); // instanciá sin Container

    for (const raw of (rawCandidates as CandidateRaw[])) {
        // 1️⃣ Asegurarnos de tener un `id`
        const id = raw.id ?? uuidv4();

        // 2️⃣ Construir el candidato "completo"
        const candidate = {
            ...raw,
            id,              // como campo dentro del documento
        };

        try {
            // 3️⃣ Generar embedding desde tu microservicio
            const vector = await embeddingService.getEmbedding(candidate.extract);

            // 4️⃣ Indexar en ES usando ese mismo `id` como _id
            await esClient.indexCandidate(id, candidate, vector);

            console.log(`✅ Indexed: ${candidate.name} ${candidate.lastName} (id=${id})`);
        } catch (err) {
            console.error(`❌ Error indexando ${candidate.name} (id=${id}):`, err);
        }
    }

    console.log('🏁 Pre‑indexación completada.');
    process.exit(0);
}

preIndex().catch(err => {
    console.error('❌ Fatal error en preIndex:', err);
    process.exit(1);
});
