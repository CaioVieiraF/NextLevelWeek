import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('itens').insert([
        {title: 'Lampadas', image: 'lampadas.svg'},
        {title: 'Pilhas e baterias', image: 'baterias.svg'},
        {title: 'Papeis e papelão', image: 'papeis-papelao.svg'},
        {title: 'Resíduos eletronicos', image: 'eletronicos.svg'},
        {title: 'Resíduos orgânicos', image: 'organicos.svg'},
        {title: 'Óleo de cozinha', image: 'oleo.svg'}
    ]);
};
