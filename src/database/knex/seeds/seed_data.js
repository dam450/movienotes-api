/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'Usuario1',
      email: 'Usuario1@email.com',
      password: '$2a$08$wQ4nNsCGPJGG0jLpoxjjkOfpqr2Bm96055LEUYGLD3XJ0C2Qvz8Ci',
    },
  ])

    await knex('movie_notes').del()
    await knex('movie_notes').insert([
      {
        title: 'Velozes & Furiosos',
        description:
          'Brian O´Conner (Paul Walker) é um policial novato que se infiltra no mundo das corridas ilegais de carros tunados nas ruas de Los Angeles para capturar o responsável por diversos roubos a cargas de caminhões em rodovias. O problema é que ele acaba se envolvendo muito com a gangue liderada por Domonic Toretto (Vin Diesel) e se apaixona pela irmã do bandido, Mia (Jordana Brewster).',
        rating: 3,
        user_id: 1,
      },
      {
        title: 'Interestellar',
        description:
          'Pragas nas colheitas fizeram a civilização humana regredir para uma sociedade agrária em futuro de data desconhecida. Cooper, ex-piloto da NASA, tem uma fazenda com sua família. Murphy, a filha de dez anos de Cooper, acredita que seu quarto está assombrado por um fantasma que tenta se comunicar com ela. Pai e filha descobrem que o "fantasma" é uma inteligência desconhecida que está enviando mensagens codificadas através de radiação gravitacional, deixando coordenadas em binário que os levam até uma instalação secreta da NASA liderada pelo professor John Brand. O cientista revela que um buraco de minhoca foi aberto perto de Saturno e que ele leva a planetas que podem oferecer condições de sobrevivência para a espécie humana. As "missões Lázaro" enviadas anos antes identificaram três planetas potencialmente habitáveis orbitando o buraco negro Gargântua: Miller, Edmunds e Mann – nomeados em homenagem aos astronautas que os pesquisaram. Brand recruta Cooper para pilotar a nave espacial Endurance e recuperar os dados dos astronautas; se um dos planetas se mostrar habitável, a humanidade irá seguir para ele na instalação da NASA, que é na realidade uma enorme estação espacial. A partida de Cooper devasta Murphy. Além de Cooper, a tripulação da Endurance é formada pela bióloga Amelia, filha de Brand; o cientista Romilly, o físico planetário Doyle, além dos robôs TARS e CASE. Eles entram no buraco de minhoca e se dirigem a Miller, porém descobrem que o planeta possui enorme dilatação gravitacional temporal por estar tão perto de Gargântua: cada hora na superfície equivale a sete anos na Terra. Eles entram em Miller e descobrem que é inóspito já que é coberto por um oceano raso e agitado por ondas enormes. Uma onda atinge a tripulação enquanto Amelia tenta recuperar os dados de Miller, matando Doyle e atrasando a partida. Ao voltarem para a Endurance, Cooper e Amelia descobrem que 23 anos se passaram.',
        rating: 5,
        user_id: 1,
      },
      {
        title: 'Indiana Jones e a Última Cruzada',
        description:
          'Em 1938, depois que seu pai, o professor Henry Jones, desaparece enquanto persegue o Santo Graal, o professor Henry "Indiana" Jones, Jr. se encontra contra os nazistas de Adolf Hitler.',
        rating: 4,
        user_id: 1,
      },
    ])

    await knex('movie_tags').del()
    await knex('movie_tags').insert([
      {
        note_id: 1,
        user_id: 1,
        name: 'ação',
      },
      {
        note_id: 1,
        user_id: 1,
        name: 'aventura',
      },
      {
        note_id: 2,
        user_id: 1,
        name: 'Ficção Científica',
      },
      {
        note_id: 2,
        user_id: 1,
        name: 'Drama',
      },
      {
        note_id: 2,
        user_id: 1,
        name: 'Família',
      },
      {
        note_id: 3,
        user_id: 1,
        name: 'Ação',
      },
      {
        note_id: 3,
        user_id: 1,
        name: 'Aventura',
      },
    ])
};
