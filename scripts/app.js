const { faker } = require('@faker-js/faker');
const fs = require('fs');

const levelEnglish = ["A1","A2","B1","B2","C1","C2"]

const professions = [
    { name: "Software Engineer", field: "IT" },
    { name: "Data Scientist", field: "IT" },
    { name: "Network Engineer", field: "IT" },
    { name: "Civil Engineer", field: "Engineering" },
    { name: "Mechanical Engineer", field: "Engineering" },
    { name: "Electrical Engineer", field: "Engineering" },
    { name: "Doctor", field: "Healthcare" },
    { name: "Nurse", field: "Healthcare" },
    { name: "Teacher", field: "Education" },
    { name: "Professor", field: "Education" },
    { name: "Marketing Manager", field: "Marketing" },
    { name: "Sales Manager", field: "Sales" }
];
const skills = ["Java", "React", "Docker", "Node", "Express", "AWS", "CI/CD", "Go", "Python", "Ruby", "Project Management", "Budgeting", "Negotiation", "Team Management"];
const companies = ["Mercado Libre", "Santander", "Globant", "Despegar", "Telecom", "Google", "Microsoft", "Amazon", "Johnson & Johnson", "Pfizer", "General Electric", "Ford"];
const positions = ["Software Engineer", "Senior Software Engineer", "Full Stack Developer", "Backend Developer", "Frontend Developer", "Data Scientist", "Network Engineer", "Civil Engineer", "Mechanical Engineer", "Doctor", "Nurse", "Teacher", "Professor", "Marketing Manager", "Sales Manager"];

function generateCandidate() {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName();
    const profession = faker.helpers.arrayElement(professions);
    const age = faker.number.int({ min: 22, max: 60 });
    const mail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const phone = faker.phone.number()
    const country = faker.location.countryCode('alpha-2')
    const linkedinUrl = `www.linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const extract = `${profession.name} with experience in ${profession.field}. Focused on new projects and challenges in ${profession.field === 'IT' ? 'software development' : profession.field.toLowerCase()}. Proficient in ${faker.helpers.arrayElements(skills, 4).join(', ')}.`;
    const englishLevel =  faker.helpers.arrayElement(levelEnglish)

    const skillList = faker.helpers.arrayElements(skills, 4).map(skill => ({
        name: skill,
        years: faker.number.int({ min: 1, max: 10 })
    }));

    const experienceList = Array.from({ length: 3 }, () => {
        const start = faker.date.past({ years: 10 });
        const end = faker.datatype.boolean() ? faker.date.between({ from: start, to: new Date() }) : null;
        return {
            position: faker.helpers.arrayElement(positions),
            init: `${start.getMonth()}/${start.getFullYear()}`,
            end: end ? `${end.getMonth()}/${end.getFullYear()}` : null,
            actually: !end,
            company: faker.helpers.arrayElement(companies),
            description: faker.lorem.sentence()
        };
    });

    return {
        name: firstName,
        lastName: lastName,
        age: age,
        mail: mail,
        country,
        phone: phone,
        linkedinUrl: linkedinUrl,
        extract: extract,
        skills: skillList,
        experience: experienceList,
        englishLevel
    };
}

const candidates =  Array.from({ length: 10000 }, generateCandidate);

fs.writeFile('candidates_large.json', JSON.stringify(candidates, null, 4), (err) => {
    if (err) throw err;
    console.log('File has been saved.');
});
