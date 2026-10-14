import React, { useState, useEffect } from 'react';
import { 
  Utensils, Coffee, Sun, Moon, Dessert, Search, Heart, 
  CheckSquare, Square, LogOut, Key, Plus, ChevronRight, X, Clock, Flame, BarChart2
} from 'lucide-react';

// Base de dados local com 80 Receitas (20 de cada categoria)
const RECEITAS_INICIAIS = [
  // CAFÉ DA MANHÃ (20)
  { id: 'c1', titulo: 'Crepioca Fit de Queijo', categoria: 'cafe', tempo: '10 min', rendimento: '1 porção', calorias: '220 kcal', dificuldade: 'Fácil', descricao: 'Massa leve de tapioca com ovo e recheio cremoso.', ingredientes: ['1 ovo', '2 col. sopa de goma de tapioca', '50g de queijo branco', 'Orégano e sal a gosto'], modo_preparo: ['Bata o ovo com a tapioca e sal.', 'Despeje na frigideira quente.', 'Adicione o queijo e dobre.'] },
  { id: 'c2', titulo: 'Pão de Queijo de Frigideira', categoria: 'cafe', tempo: '12 min', rendimento: '2 porções', calorias: '280 kcal', dificuldade: 'Fácil', descricao: 'Pão de queijo rápido, macio por dentro e crocante por fora.', ingredientes: ['1 ovo', '3 col. sopa de polvilho azedo', '1 col. sopa de requeijão', '30g de queijo ralado'], modo_preparo: ['Misture todos os ingredientes.', 'Cozinhe em fogo baixo dos dois lados.', 'Sirva quentinho.'] },
  { id: 'c3', titulo: 'Panqueca de Banana com Aveia', categoria: 'cafe', tempo: '15 min', rendimento: '1 porção', calorias: '240 kcal', dificuldade: 'Fácil', descricao: 'Doce natural, rica em fibras e perfeita para o pré-treino.', ingredientes: ['1 banana madura', '1 ovo', '2 col. sopa de aveia', 'Canela a gosto'], modo_preparo: ['Amasse a banana e misture com o ovo e aveia.', 'Dore os discos na frigideira.', 'Polvilhe canela.'] },
  { id: 'c4', titulo: 'Ovos Mexidos Cremosos estilo Hotel', categoria: 'cafe', tempo: '8 min', rendimento: '1 porção', calorias: '190 kcal', dificuldade: 'Fácil', descricao: 'Textura suave e aveludada sem empelotar.', ingredientes: ['2 ovos', '1 col. sopa de manteiga', '1 col. sopa de creme de leite', 'Sal e pimenta'], modo_preparo: ['Bata os ovos levemente.', 'Cozinhe em fogo baixíssimo mexendo sempre com espátula.', 'Incorpore a manteiga e creme de leite.'] },
  { id: 'c5', titulo: 'Smoothie Energético de Frutas Vermelhas', categoria: 'cafe', tempo: '5 min', rendimento: '1 copo', calorias: '180 kcal', dificuldade: 'Fácil', descricao: 'Bebida refrescante e cheia de antioxidantes.', ingredientes: ['1 xícara de frutas vermelhas congeladas', '200ml de leite ou bebida vegetal', '1 col. mel'], modo_preparo: ['Bata tudo no liquidificador até ficar homogêneo.', 'Sirva bem gelado.'] },
  { id: 'c6', titulo: 'Omelete de Peito de Peru e Espinafre', categoria: 'cafe', tempo: '10 min', rendimento: '1 porção', calorias: '210 kcal', dificuldade: 'Fácil', descricao: 'Proteica e leve para começar o dia.', ingredientes: ['2 ovos', '2 fatias de peito de peru picado', '1 punhado de espinafre'], modo_preparo: ['Refogue o espinafre.', 'Despeje os ovos batidos e peito de peru.', 'Dobre e sirva.'] },
  { id: 'c7', titulo: 'Overnight Oats de Chia e Maçã', categoria: 'cafe', tempo: '5 min (+4h)', rendimento: '1 pote', calorias: '230 kcal', dificuldade: 'Fácil', descricao: 'Prático para deixar pronto na noite anterior.', ingredientes: ['3 col. aveia', '1 col. chia', '150ml de leite', 'Maçã picada e canela'], modo_preparo: ['Misture aveia, chia e leite em um pote.', 'Deixe na geladeira durante a noite.', 'Sirva com maçã e canela.'] },
  { id: 'c8', titulo: 'Torrada Avillez com Abacate e Ovo', categoria: 'cafe', tempo: '10 min', rendimento: '1 porção', calorias: '290 kcal', dificuldade: 'Fácil', descricao: 'Clássico moderno, saboroso e nutritivo.', ingredientes: ['1 fatia de pão de fermentação natural', '1/2 abacate amassado', '1 ovo poché ou cozido'], modo_preparo: ['Toste o pão.', 'Passe o abacate temperado com limão e sal.', 'Coloque o ovo por cima.'] },
  { id: 'c9', titulo: 'Tapioca Crocante de Requeijão', categoria: 'cafe', tempo: '8 min', rendimento: '1 porção', calorias: '250 kcal', dificuldade: 'Fácil', descricao: 'Com casquinha de queijo dourada por fora.', ingredientes: ['3 col. goma de tapioca', '2 col. requeijão', '50g de queijo ralado na frigideira'], modo_preparo: ['Derreta o queijo direto na frigideira.', 'Peneire a tapioca por cima e recheie com requeijão.', 'Dobre quando dourar.'] },
  { id: 'c10', titulo: 'Waffle de Aveia e Cacau', categoria: 'cafe', tempo: '12 min', rendimento: '2 unidades', calorias: '260 kcal', dificuldade: 'Médio', descricao: 'Crocante por fora e fofinho por dentro.', ingredientes: ['1 ovo', '1/2 xícara de aveia', '1 col. cacau em pó', '100ml de leite'], modo_preparo: ['Bata tudo e despeje na máquina de waffle.', 'Asse até dourar.'] },
  { id: 'c11', titulo: 'Vitamina Fit de Abacate e Cacau', categoria: 'cafe', tempo: '5 min', rendimento: '1 copo', calorias: '220 kcal', dificuldade: 'Fácil', descricao: 'Textura de mousse rica em gorduras boas.', ingredientes: ['1/4 de abacate', '250ml de leite', '1 col. cacau em pó', 'Adoçante a gosto'], modo_preparo: ['Bata tudo no liquidificador até ficar cremoso.'] },
  { id: 'c12', titulo: 'Muffin de Frigideira de Maçã', categoria: 'cafe', tempo: '10 min', rendimento: '1 porção', calorias: '190 kcal', dificuldade: 'Fácil', descricao: 'Bolinho rápido com cheirinho de canela.', ingredientes: ['1 ovo', '1/2 maçã ralada', '2 col. aveia em flocos', '1 pitada de fermento'], modo_preparo: ['Misture os ingredientes.', 'Asse em frigideira pequena tampada em fogo baixo.'] },
  { id: 'c13', titulo: 'Mingau Proteico de Aveia', categoria: 'cafe', tempo: '8 min', rendimento: '1 porção', calorias: '270 kcal', dificuldade: 'Fácil', descricao: 'Confortável, quente e saciante.', ingredientes: ['4 col. aveia', '200ml de leite', '1 scoop de Whey ou 1 col. cacau', 'Canela'], modo_preparo: ['Cozinhe a aveia no leite mexendo até engrossar.', 'Desligue e adicione o saborizador.'] },
  { id: 'c14', titulo: 'Iogurte Grego com Granola Caseira', categoria: 'cafe', tempo: '3 min', rendimento: '1 taça', calorias: '200 kcal', dificuldade: 'Fácil', descricao: 'Montagem rápida e rica em proteínas.', ingredientes: ['150g iogurte grego natural', '3 col. granola', 'Fios de mel'], modo_preparo: ['Monte em camadas em um copo e sirva.'] },
  { id: 'c15', titulo: 'Bolo de Caneca de Banana em 2 min', categoria: 'cafe', tempo: '3 min', rendimento: '1 caneca', calorias: '210 kcal', dificuldade: 'Fácil', descricao: 'Praticidade extrema no micro-ondas.', ingredientes: ['1 banana amassada', '1 ovo', '2 col. aveia', '1/2 col. café de fermento'], modo_preparo: ['Misture tudo na caneca e leve ao micro-ondas por 1 min 30 s.'] },
  { id: 'c16', titulo: 'Cuscuz Nordestino com Ovo', categoria: 'cafe', tempo: '15 min', rendimento: '2 porções', calorias: '310 kcal', dificuldade: 'Fácil', descricao: 'Tradicional, fofinho e muito saboroso.', ingredientes: ['1 xícara de flocão de milho', '1/2 xícara de água', '1 pitada de sal', '2 ovos fritos'], modo_preparo: ['Hidrate o flocão por 10 min.', 'Cozinhe na cuscuzeira por 10 min e sirva com ovos.'] },
  { id: 'c17', titulo: 'Pão Naan Frigideira de Iogurte', categoria: 'cafe', tempo: '15 min', rendimento: '2 pães', calorias: '220 kcal', dificuldade: 'Médio', descricao: 'Pão sem fermento biológico super macio.', ingredientes: ['1/2 xícara farinha de trigo', '3 col. iogurte natural', '1 pitada fermento em pó'], modo_preparo: ['Amasse até formar bolinha, abra e doure na frigideira.'] },
  { id: 'c18', titulo: 'Tostex Rápido de Ricota e Ervas', categoria: 'cafe', tempo: '7 min', rendimento: '1 sanduíche', calorias: '230 kcal', dificuldade: 'Fácil', descricao: 'Leve e aromatizado.', ingredientes: ['2 fatias pão integral', '3 col. ricota amassada', 'Azeite, sal e orégano'], modo_preparo: ['Recheie o pão e doure na sanduicheira ou frigideira.'] },
  { id: 'c19', titulo: 'Pãezinhos de Batata Doce na Air Fryer', categoria: 'cafe', tempo: '18 min', rendimento: '4 pãezinhos', calorias: '180 kcal', dificuldade: 'Médio', descricao: 'Massa leve sem glúten.', ingredientes: ['1/2 xícara batata doce cozida amassada', '1/2 xícara polvilho doce', '1 col. azeite'], modo_preparo: ['Modelar bolinhas e assar a 180°C por 12 min na Air Fryer.'] },
  { id: 'c20', titulo: 'Pancakes Americanas de Baunilha', categoria: 'cafe', tempo: '15 min', rendimento: '4 panquecas', calorias: '320 kcal', dificuldade: 'Médio', descricao: 'Altas, macias e fofinhas.', ingredientes: ['1 xícara farinha', '1 ovo', '3/4 xícara leite', '1 col. açúcar', '1 col. fermento'], modo_preparo: ['Misture e doure conchas de massa em fogo baixo.'] },

  // ALMOÇO (20)
  { id: 'a1', titulo: 'Frango Parmegiana na Air Fryer', categoria: 'almoco', tempo: '25 min', rendimento: '2 porções', calorias: '380 kcal', dificuldade: 'Médio', descricao: 'Crocante, com molho rústico e sem fritura em óleo.', ingredientes: ['2 filés de frango', '1 ovo e aveia para empanar', '100g de mussarela', '1/2 xícara molho de tomate'], modo_preparo: ['Empane o frango na aveia.', 'Asse na Air Fryer 15 min a 200°C.', 'Cubra com molho, queijo e gratine.'] },
  { id: 'a2', titulo: 'Escondidinho de Carne Moída com Macaxeira', categoria: 'almoco', tempo: '35 min', rendimento: '4 porções', calorias: '420 kcal', dificuldade: 'Médio', descricao: 'Purê aveludado com recheio bem temperado.', ingredientes: ['500g macaxeira cozida', '400g carne moída refogada', '2 col. requeijão', 'Queijo para gratinar'], modo_preparo: ['Faça o purê com a macaxeira e requeijão.', 'Monte camadas de purê, carne e purê.', 'Gratine no forno.'] },
  { id: 'a3', titulo: 'Strogonoff Leve de Frango com Cogumelos', categoria: 'almoco', tempo: '20 min', rendimento: '3 porções', calorias: '350 kcal', dificuldade: 'Fácil', descricao: 'Molho cremoso à base de iogurte ou creme de leite leve.', ingredientes: ['500g peito de frango em cubos', '1/2 xícara cogumelos', '1 col. mostarda', '1 caixa creme de leite leve'], modo_preparo: ['Doure o frango e cogumelos.', 'Adicione mostarda, molho de tomate e finalize com creme de leite.'] },
  { id: 'a4', titulo: 'Moqueca Rápida de Peixe', categoria: 'almoco', tempo: '30 min', rendimento: '3 porções', calorias: '310 kcal', dificuldade: 'Médio', descricao: 'Prato aromático cheio de brasilidade.', ingredientes: ['500g filé de peixe firme', '1 pimentão em rodelas', '1 tomate', '200ml leite de coco', 'Azeite de dendê'], modo_preparo: ['Monte camadas de vegetais e peixe na panela.', 'Despeje o leite de coco e dendê.', 'Cozinhe tampado por 20 min.'] },
  { id: 'a5', titulo: 'Macarrão Carbonara Rápido', categoria: 'almoco', tempo: '15 min', rendimento: '2 porções', calorias: '490 kcal', dificuldade: 'Médio', descricao: 'Clássico italiano super cremoso.', ingredientes: ['200g macarrão espaguete', '2 gemas + 1 ovo', '80g queijo parmesão ralado', '100g bacon em cubos'], modo_preparo: ['Frite o bacon.', 'Misture ovos e queijo.', 'Junte a massa quente fora do fogo com a mistura de ovos.'] },
  { id: 'a6', titulo: 'Salmão Grelhado com Molho de Maracujá', categoria: 'almoco', tempo: '20 min', rendimento: '2 porções', calorias: '390 kcal', dificuldade: 'Médio', descricao: 'Agridoce elegante e sofisticado.', ingredientes: ['2 postas de salmão', 'Polpa de 1 maracujá', '1 col. mel', '1 col. manteiga'], modo_preparo: ['Grelhe o salmão.', 'Reduza a polpa com mel e manteiga em outra panela e sirva por cima.'] },
  { id: 'a7', titulo: 'Risoto Prático de Fungi', categoria: 'almoco', tempo: '30 min', rendimento: '2 porções', calorias: '410 kcal', dificuldade: 'Chef', descricao: 'Cremoso e aveludado.', ingredientes: ['1 xícara arroz arbóreo', '50g fungi secchi hidratado', '1/2 xícara vinho branco', 'Caldo de legumes'], modo_preparo: ['Refogue o arroz, adicione vinho e vá colocando o caldo aos poucos mexendo sempre.'] },
  { id: 'a8', titulo: 'Feijoada Fit de Coxa de Frango e Legumes', categoria: 'almoco', tempo: '40 min', rendimento: '4 porções', calorias: '360 kcal', dificuldade: 'Médio', descricao: 'Versão mais leve sem perder o sabor.', ingredientes: ['2 xícaras feijão preto cozido', '300g sobrecoxa sem pele em cubos', 'Legumes variados', 'Tempero verde'], modo_preparo: ['Cozinhe o frango temperado e junte ao feijão com os legumes até apurar.'] },
  { id: 'a9', titulo: 'Picadinho de Carne com Molho Ferrugem', categoria: 'almoco', tempo: '25 min', rendimento: '3 porções', calorias: '400 kcal', dificuldade: 'Fácil', descricao: 'Carne macia com molho encorpado.', ingredientes: ['500g alcatra em cubos', '1 cebola picada', '1 col. extrato de tomate', '1/2 xícara água'], modo_preparo: ['Selar a carne em fogo alto, refogar cebola e adicionar extrato até criar molho rico.'] },
  { id: 'a10', titulo: 'Sobrecoxa Assada com Batatas ao Murro', categoria: 'almoco', tempo: '45 min', rendimento: '3 porções', calorias: '430 kcal', dificuldade: 'Fácil', descricao: 'Pele crocante e batatas aromáticas com alecrim.', ingredientes: ['4 sobrecoxas', '500g batatinhas pequenas', 'Azeite, alho e alecrim'], modo_preparo: ['Assar tudo junto no forno a 200°C por 40 min até dourar.'] },
  { id: 'a11', titulo: 'Arroz Piamontese Cremoso', categoria: 'almoco', tempo: '15 min', rendimento: '3 porções', calorias: '370 kcal', dificuldade: 'Fácil', descricao: 'Acompanhamento perfeito para carnes.', ingredientes: ['2 xícaras arroz cozido', '1/2 lata creme de leite', '100g queijo mussarela', 'Champignon'], modo_preparo: ['Aquecer o arroz com creme de leite, champignon e derreter o queijo.'] },
  { id: 'a12', titulo: 'Filé de Tilápia com Crosta de Ervas', categoria: 'almoco', tempo: '18 min', rendimento: '2 porções', calorias: '260 kcal', dificuldade: 'Fácil', descricao: 'Peixe leve com cobertura crocante.', ingredientes: ['2 filés tilápia', '2 col. farinha panko', 'Ervas finas e azeite'], modo_preparo: ['Pressionar a mistura de panko e ervas no peixe e assar por 15 min.'] },
  { id: 'a13', titulo: 'Nhoque de Batata Doce ao Sugo', categoria: 'almoco', tempo: '35 min', rendimento: '3 porções', calorias: '320 kcal', dificuldade: 'Médio', descricao: 'Massa caseira leve.', ingredientes: ['2 batatas doces cozidas', '1/2 xícara farinha trigo', '1 xícara molho tomate'], modo_preparo: ['Amasse a batata, adicione farinha, molde nhoques, cozinhe em água fervente e cubra com molho.'] },
  { id: 'a14', titulo: 'Bife de Ancho na Frigideira com Manteiga de Ervas', categoria: 'almoco', tempo: '12 min', rendimento: '1 porção', calorias: '480 kcal', dificuldade: 'Médio', descricao: 'Sabor de churrascaria em casa.', ingredientes: ['1 bife ancho 250g', '1 col. manteiga', 'Alho e tomilho'], modo_preparo: ['Selar o bife em frigideira bem quente e regar com a manteiga derretida com ervas.'] },
  { id: 'a15', titulo: 'Lasanha de Abobrinha com Carne Moída', categoria: 'almoco', tempo: '35 min', rendimento: '3 porções', calorias: '290 kcal', dificuldade: 'Médio', descricao: 'Baixo carboidrato e cheia de sabor.', ingredientes: ['2 abobrinhas em fatias finas', '300g carne moída ao molho', '150g mussarela'], modo_preparo: ['Alternar fatias de abobrinha, carne e queijo. Assar por 25 min.'] },
  { id: 'a16', titulo: 'Salada Ceasar com Frango Grelhado', categoria: 'almoco', tempo: '15 min', rendimento: '2 porções', calorias: '310 kcal', dificuldade: 'Fácil', descricao: 'Refrescante com molho tradicional.', ingredientes: ['Alface americana', '1 peito frango grelhado em tiras', 'Croutons e parmesão', 'Molho Ceasar'], modo_preparo: ['Misturar as folhas com molho e finalizar com frango e croutons.'] },
  { id: 'a17', titulo: 'Galinhada Caipira Cremosa', categoria: 'almoco', tempo: '40 min', rendimento: '4 porções', calorias: '410 kcal', dificuldade: 'Fácil', descricao: 'Um prato único cheio de sustança.', ingredientes: ['500g frango em pedaços', '1.5 xícara arroz', 'Açafrão, milho e cheiro verde'], modo_preparo: ['Refogar o frango com açafrão, juntar o arroz e cozinhar até amaciar.'] },
  { id: 'a18', titulo: 'Quiche Sem Massa de Alho Poró', categoria: 'almoco', tempo: '30 min', rendimento: '4 porções', calorias: '210 kcal', dificuldade: 'Fácil', descricao: 'Leve, fofinha e prática.', ingredientes: ['3 ovos', '1/2 xícara leite', '1 alho poró fatiado refogado', '50g queijo'], modo_preparo: ['Bater ovos com leite, misturar alho poró e queijo e assar por 25 min.'] },
  { id: 'a19', titulo: 'Kibe de Bandeja Recheado', categoria: 'almoco', tempo: '40 min', rendimento: '6 porções', calorias: '330 kcal', dificuldade: 'Médio', descricao: 'Recheado com requeijão e hortelã.', ingredientes: ['500g carne moída', '1 xícara trigo para kibe hidratado', 'Hortelã e requeijão'], modo_preparo: ['Misture carne e trigo. Monte metade na forma, recheie com requeijão, cubra e asse.'] },
  { id: 'a20', titulo: 'Polenta Cremosa com Ragù de Linguiça', categoria: 'almoco', tempo: '30 min', rendimento: '3 porções', calorias: '420 kcal', dificuldade: 'Fácil', descricao: 'Comida afetiva e reconfortante.', ingredientes: ['1 xícara fubá', '4 xícaras água/caldo', '3 linguiças toscana desfeitas ao molho'], modo_preparo: ['Cozinhe a polenta mexendo até engrossar. Sirva com o ragù por cima.'] },

  // JANTA (20)
  { id: 'j1', titulo: 'Sopa Cremosa de Abóbora com Gengibre', categoria: 'janta', tempo: '30 min', rendimento: '3 porções', calorias: '190 kcal', dificuldade: 'Fácil', descricao: 'Leve, digestiva e aquecedora.', ingredientes: ['500g abóbora', '1 pedaço gengibre', '1 cebola', 'Caldo de legumes'], modo_preparo: ['Cozinhe a abóbora no caldo com gengibre.', 'Bata no liquidificador e ajuste o sal.'] },
  { id: 'j2', titulo: 'Wrap de Frango com Creme de Ricota', categoria: 'janta', tempo: '10 min', rendimento: '1 wrap', calorias: '260 kcal', dificuldade: 'Fácil', descricao: 'Jantar rápido em menos de 10 minutos.', ingredientes: ['1 pão folha/rap10', '100g frango desfiado', '2 col. creme de ricota', 'Alface e tomate'], modo_preparo: ['Aqueça o pão, recheie com o frango misturado ao creme e salada e enrole.'] },
  { id: 'j3', titulo: 'Caldo Verde Fit com Paio', categoria: 'janta', tempo: '25 min', rendimento: '4 porções', calorias: '220 kcal', dificuldade: 'Fácil', descricao: 'Base de couve-flor substituindo a batata.', ingredientes: ['1 couve-flor grande', '1 maço couve fatiada', '100g linguiça paio em rodelas'], modo_preparo: ['Cozinhe e bata a couve-flor.', 'Junte a couve e linguiça grelhada e ferva 5 min.'] },
  { id: 'j4', titulo: 'Omelete de Forno de Legumes', categoria: 'janta', tempo: '20 min', rendimento: '2 porções', calorias: '200 kcal', dificuldade: 'Fácil', descricao: 'Cresce no forno e fica super fofinha.', ingredientes: ['4 ovos', '1/2 xícara seleta legumes', '50g queijo prato picado'], modo_preparo: ['Bata os ovos, misture os legumes e queijo e asse por 15 min a 180°C.'] },
  { id: 'j5', titulo: 'Creme de Espinafre com Queijo', categoria: 'janta', tempo: '15 min', rendimento: '2 porções', calorias: '180 kcal', dificuldade: 'Fácil', descricao: 'Sopa aveludada verde cheia de ferro.', ingredientes: ['1 maço espinafre', '1 col. manteiga', '1 col. farinha', '1.5 xícara leite'], modo_preparo: ['Refogue o espinafre.', 'Faça o molho branco com manteiga, farinha e leite e junte tudo.'] },
  { id: 'j6', titulo: 'Salada Morna de Quinoa com Vegetais', categoria: 'janta', tempo: '20 min', rendimento: '2 porções', calorias: '250 kcal', dificuldade: 'Fácil', descricao: 'Superalimento prático para a noite.', ingredientes: ['1 xícara quinoa cozida', 'Legumes grelhados (abobrinha, cenoura, tomate)', 'Azeite e limão'], modo_preparo: ['Misturar a quinoa quente com os legumes grelhados e temperar.'] },
  { id: 'j7', titulo: 'Panqueca Integral de Carne Moída', categoria: 'janta', tempo: '25 min', rendimento: '3 panquecas', calorias: '310 kcal', dificuldade: 'Fácil', descricao: 'Clássico da janta em família.', ingredientes: ['Massa leve com trigo integral', '200g carne moída temperada', 'Molho tomate'], modo_preparo: ['Fazer os discos, rechear com carne, cobrir com molho e aquecer.'] },
  { id: 'j8', titulo: 'Shakshuka (Ovos no Molho de Tomate)', categoria: 'janta', tempo: '18 min', rendimento: '2 porções', calorias: '240 kcal', dificuldade: 'Fácil', descricao: 'Prato oriental aromático feito em uma panela só.', ingredientes: ['3 ovos', '1 lata tomate pelado', 'Pimentão, cebola e cominho'], modo_preparo: ['Refogar vegetais, adicione tomate pelado, abra covinhas e quebre os ovos. Tampe até cozinhar.'] },
  { id: 'j9', titulo: 'Creme de Mandioquinha com Frango', categoria: 'janta', tempo: '25 min', rendimento: '3 porções', calorias: '230 kcal', dificuldade: 'Fácil', descricao: 'Sabor adocicado e reconfortante.', ingredientes: ['400g mandioquinha', '150g frango desfiado', 'Cheiro verde'], modo_preparo: ['Cozinhar e bater a mandioquinha. Misturar o frango desfiado e ferver.'] },
  { id: 'j10', titulo: 'Espaguete de Abobrinha à Bolonhesa', categoria: 'janta', tempo: '15 min', rendimento: '2 porções', calorias: '190 kcal', dificuldade: 'Fácil', descricao: 'Opção leve sem carboidrato pesado à noite.', ingredientes: ['2 abobrinhas em tiras finas', '200g molho bolonhesa caseiro'], modo_preparo: ['Refogar a abobrinha por apenas 2 min para não amolecer e cobrir com molho bem quente.'] },
  { id: 'j11', titulo: 'Ceviche de Peixe Branco', categoria: 'janta', tempo: '15 min (+15m marinar)', rendimento: '2 porções', calorias: '170 kcal', dificuldade: 'Médio', descricao: 'Refrescante e sem fogo.', ingredientes: ['300g peixe branco em cubos', 'Suco de 3 limões', 'Cebola roxa e coentro'], modo_preparo: ['Marinar o peixe no suco de limão por 15 min. Juntar cebola e coentro e servir.'] },
  { id: 'j12', titulo: 'Sanduíche Natural de Atum', categoria: 'janta', tempo: '5 min', rendimento: '1 sanduíche', calorias: '240 kcal', dificuldade: 'Fácil', descricao: 'Praticidade máxima sem fogão.', ingredientes: ['2 fatias pão integral', '1/2 lata atum', '1 col. maionese light', 'Cenoura ralada'], modo_preparo: ['Misturar atum, maionese e cenoura e rechear o pão.'] },
  { id: 'j13', titulo: 'Sopa de Lentilha com Legumes', categoria: 'janta', tempo: '30 min', rendimento: '4 porções', calorias: '210 kcal', dificuldade: 'Fácil', descricao: 'Rica em fibras e ferro.', ingredientes: ['1 xícara lentilha', 'Cenoura e chuchu em cubos', 'Bacon picado para saborizar'], modo_preparo: ['Cozinhar lentilha e legumes na pressão por 10 min após chiar.'] },
  { id: 'j14', titulo: 'Cogumelos Salteados no Shoyu com Tofu', categoria: 'janta', tempo: '12 min', rendimento: '2 porções', calorias: '180 kcal', dificuldade: 'Fácil', descricao: 'Opção vegana rápida e oriental.', ingredientes: ['200g shimeji/paris', '150g tofu em cubos', '2 col. molho shoyu'], modo_preparo: ['Saltear tudo na frigideira quente com um fio de azeite e shoyu.'] },
  { id: 'j15', titulo: 'Sopa de Feijão com Macarrão e Couve', categoria: 'janta', tempo: '20 min', rendimento: '3 porções', calorias: '260 kcal', dificuldade: 'Fácil', descricao: 'Aproveitamento perfeito de feijão pronto.', ingredientes: ['2 xícaras feijão batido com água', '1/2 xícara macarrão padre nosso', 'Couve picada'], modo_preparo: ['Ferver o feijão batido, cozinhar o macarrão nele e juntar a couve no final.'] },
  { id: 'j16', titulo: 'Sufle de Chuchu com Queijo', categoria: 'janta', tempo: '35 min', rendimento: '3 porções', calorias: '170 kcal', dificuldade: 'Médio', descricao: 'Muito leve e aerado.', ingredientes: ['2 chuchus cozidos e amassados', '2 gemas + 2 claras em neve', '50g queijo ralado'], modo_preparo: ['Misturar chuchu, gemas e queijo. Incorporar claras em neve e assar.'] },
  { id: 'j17', titulo: 'Torta de Frigideira sem Farinha', categoria: 'janta', tempo: '12 min', rendimento: '2 porções', calorias: '220 kcal', dificuldade: 'Fácil', descricao: 'Massa à base de ovo e tapioca.', ingredientes: ['2 ovos', '2 col. tapioca', 'Atum ou frango para recheio'], modo_preparo: ['Misturar massa, colocar metade na frigideira, recheio e cobrir com o restante.'] },
  { id: 'j18', titulo: 'Creme de Milho Rápido com Frango', categoria: 'janta', tempo: '15 min', rendimento: '2 porções', calorias: '270 kcal', dificuldade: 'Fácil', descricao: 'Cremoso e saboroso.', ingredientes: ['1 lata milho', '1 xícara leite', '1 col. amido', 'Frango desfiado'], modo_preparo: ['Bater metade do milho com leite e amido, aquecer com o resto do milho e frango até engrossar.'] },
  { id: 'j19', titulo: 'Tabule de Caulinho (Couve-flor)', categoria: 'janta', tempo: '10 min', rendimento: '2 porções', calorias: '130 kcal', dificuldade: 'Fácil', descricao: 'Salada árabe em versão Low Carb.', ingredientes: ['2 xícaras couve-flor triturada crua', 'Tomate, pepino, hortelã e limão'], modo_preparo: ['Misturar todos os ingredientes picadinhos e temperar com azeite e limão.'] },
  { id: 'j20', titulo: 'Ovos Poché em Caldo de Legumes', categoria: 'janta', tempo: '10 min', rendimento: '1 porção', calorias: '150 kcal', dificuldade: 'Médio', descricao: 'Conforto simples para noites frias.', ingredientes: ['2 ovos', '300ml caldo legumes quente', 'Torrada para acompanhar'], modo_preparo: ['Cozinhar os ovos delicadamente dentro do caldo fervente por 4 min.'] },

  // DOCES (20)
  { id: 'd1', titulo: 'Brigadeiro Gourmet de Colher', categoria: 'doces', tempo: '15 min', rendimento: '4 porções', calorias: '210 kcal', dificuldade: 'Fácil', descricao: 'Textura aveludada que não cristaliza.', ingredientes: ['1 lata leite condensado', '100g creme de leite', '3 col. cacau 50%', '1 col. manteiga'], modo_preparo: ['Cozinhar em fogo baixo mexendo sempre até ponto de colher cremoso.'] },
  { id: 'd2', titulo: 'Pudim de Leite condensado na Air Fryer', categoria: 'doces', tempo: '30 min', rendimento: '6 porções', calorias: '280 kcal', dificuldade: 'Médio', descricao: 'Sem furos, lisinho e feito na metade do tempo.', ingredientes: ['1 lata leite condensado', '1 lata leite', '3 ovos', 'Caramelo para forma'], modo_preparo: ['Bater ingredientes, despejar na forma caramelizada e assar a 160°C por 30 min coberto com alumínio.'] },
  { id: 'd3', titulo: 'Mousse de Maracujá de 3 Ingredientes', categoria: 'doces', tempo: '10 min (+2h gelado)', rendimento: '5 porções', calorias: '220 kcal', dificuldade: 'Fácil', descricao: 'Prático e sem gelatina.', ingredientes: ['1 lata leite condensado', '1 caixa creme de leite', '1/2 xícara suco concentrado maracujá'], modo_preparo: ['Bater tudo no liquidificador por 5 min e levar para gelar.'] },
  { id: 'd4', titulo: 'Cartola Pernambucana Tradicional', categoria: 'doces', tempo: '10 min', rendimento: '1 porção', calorias: '310 kcal', dificuldade: 'Fácil', descricao: 'Banana frita com queijo manteiga, canela e açúcar.', ingredientes: ['1 banana cortada ao meio', '80g queijo coalho ou manteiga', 'Açúcar e canela'], modo_preparo: ['Fritar a banana e derreter o queijo por cima. Polvilhar açúcar e canela.'] },
  { id: 'd5', titulo: 'Brownie Rápido de Frigideira', categoria: 'doces', tempo: '10 min', rendimento: '2 porções', calorias: '250 kcal', dificuldade: 'Fácil', descricao: 'Massa úmida e densa.', ingredientes: ['1 ovo', '2 col. açúcar', '2 col. cacau', '1 col. manteiga derretida', '1 col. farinha'], modo_preparo: ['Misturar tudo e assar em frigideira pequena tampada em fogo baixíssimo.'] },
  { id: 'd6', titulo: 'Cocada Cremosa de Colher', categoria: 'doces', tempo: '15 min', rendimento: '4 porções', calorias: '240 kcal', dificuldade: 'Fácil', descricao: 'Sabor marcante de coco fresco.', ingredientes: ['100g coco ralado úmido', '1/2 lata leite condensado', '1/2 xícara leite de coco'], modo_preparo: ['Levar tudo ao fogo mexendo até soltar levemente do fundo.'] },
  { id: 'd7', titulo: 'Doce de Leite Caseiro de Pressão', categoria: 'doces', tempo: '40 min', rendimento: '8 porções', calorias: '190 kcal', dificuldade: 'Fácil', descricao: 'Consistência firme e cor dourada linda.', ingredientes: ['1 lata leite condensado (lata de ferro)'], modo_preparo: ['Cozinhar a lata coberta de água na pressão por 30 min. Deixar esfriar total antes de abrir.'] },
  { id: 'd8', titulo: 'Petit Gâteau de Caneca', categoria: 'doces', tempo: '3 min', rendimento: '1 porção', calorias: '290 kcal', dificuldade: 'Médio', descricao: 'Bolinho quente com centro derretido.', ingredientes: ['30g chocolate meio amargo', '1 col. manteiga', '1 ovo', '1 col. açúcar', '1 col. farinha'], modo_preparo: ['Derreter chocolate com manteiga, misturar resto e assar 50s no micro-ondas.'] },
  { id: 'd9', titulo: 'Banana Flambada com Sorvete', categoria: 'doces', tempo: '8 min', rendimento: '2 porções', calorias: '260 kcal', dificuldade: 'Médio', descricao: 'Sobremesa de restaurante em minutos.', ingredientes: ['2 bananas', '2 col. açúcar', '1 col. manteiga', '1 dose de conhaque ou cachaça'], modo_preparo: ['Caramelizar bananas na manteiga com açúcar, adicionar bebida e inflamar com cuidado.'] },
  { id: 'd10', titulo: 'Danoninho Caseiro Saudável', categoria: 'doces', tempo: '5 min (+1h gelado)', rendimento: '4 porções', calorias: '130 kcal', dificuldade: 'Fácil', descricao: 'Sucesso absoluto com as crianças.', ingredientes: ['1 caixa morangos', '1/2 xícara iogurte natural', '1/2 xícara leite em pó', 'Adoçante/Mel'], modo_preparo: ['Bater tudo no liquidificador e gelar em potinhos.'] },
  { id: 'd11', titulo: 'Palha Italiana de Brigadeiro', categoria: 'doces', tempo: '20 min', rendimento: '6 porções', calorias: '270 kcal', dificuldade: 'Fácil', descricao: 'Brigadeiro com pedaços crocantes de biscoito.', ingredientes: ['1 receita brigadeiro', '1/2 pacote biscoito maizena picado'], modo_preparo: ['Misturar biscoito no brigadeiro quente, moldar em travessa e cortar em cubos.'] },
  { id: 'd12', titulo: 'Gelado de Abacaxi com Creme', categoria: 'doces', tempo: '25 min (+3h gelado)', rendimento: '6 porções', calorias: '210 kcal', dificuldade: 'Fácil', descricao: 'Refrescante e equilibrado.', ingredientes: ['1 abacaxi picado cozido com açúcar', '1 lata leite condensado', '1 caixa creme de leite'], modo_preparo: ['Fazer creme com leite condensado e leite. Alternar com abacaxi e gelar.'] },
  { id: 'd13', titulo: 'Torta Holandesa no Pote', categoria: 'doces', tempo: '20 min', rendimento: '4 potes', calorias: '320 kcal', dificuldade: 'Médio', descricao: 'Camadas de creme branco e ganache.', ingredientes: ['Biscoito calipso', 'Creme de manteiga, açúcar e creme de leite', 'Ganache chocolate'], modo_preparo: ['Montar biscoitos na lateral do pote, rechear com creme e cobrir com ganache.'] },
  { id: 'd14', titulo: 'Romeu e Julieta de Forno', categoria: 'doces', tempo: '12 min', rendimento: '2 porções', calorias: '250 kcal', dificuldade: 'Fácil', descricao: 'Goiabada derretida com queijo quente.', ingredientes: ['150g goiabada em fatias', '150g queijo minas ou queijo coalho'], modo_preparo: ['Alternar fatias em refratário e assar até derreter.'] },
  { id: 'd15', titulo: 'Gelatina Colorida Cremosa', categoria: 'doces', tempo: '20 min (+4h gelado)', rendimento: '8 porções', calorias: '140 kcal', dificuldade: 'Fácil', descricao: 'Nostálgica e visual lindo.', ingredientes: ['3 sabores gelatina prontos em cubos', '1 lata leite condensado', '1 creme de leite', '1 gelatina sem sabor'], modo_preparo: ['Bater cremes com gelatina sem sabor e despejar sobre os cubos coloridos.'] },
  { id: 'd16', titulo: 'Churros de Doce de Leite na Air Fryer', categoria: 'doces', tempo: '20 min', rendimento: '8 minichurros', calorias: '230 kcal', dificuldade: 'Médio', descricao: 'Sem fritura em imersão.', ingredientes: ['Massa cozida trigo e água', 'Açúcar e canela', 'Doce de leite para mergulhar'], modo_preparo: ['Modelar churros, assar a 200°C por 10 min na Air Fryer e passar na canela.'] },
  { id: 'd17', titulo: 'Sorvete de Banana e Cacau com 2 Ingredientes', categoria: 'doces', tempo: '5 min', rendimento: '2 porções', calorias: '120 kcal', dificuldade: 'Fácil', descricao: 'Cremoso como sorvete artesanal, sem açúcar adicionado.', ingredientes: ['2 bananas congeladas em rodelas', '2 col. cacau em pó'], modo_preparo: ['Processar bananas congeladas no multiprocessador com cacau até virar creme.'] },
  { id: 'd18', titulo: 'Beijinho de Coco Tradicional', categoria: 'doces', tempo: '15 min', rendimento: '15 docinhos', calorias: '90 kcal/unid', dificuldade: 'Fácil', descricao: 'Com cravinho no topo.', ingredientes: ['1 lata leite condensado', '1 col. manteiga', '100g coco ralado'], modo_preparo: ['Cozinhar até desprender do fundo da panela, enrolar e passar no coco.'] },
  { id: 'd19', titulo: 'Mousse Fit de Chocolate com Abacate', categoria: 'doces', tempo: '5 min', rendimento: '2 porções', calorias: '180 kcal', dificuldade: 'Fácil', descricao: 'Ninguém diz que leva abacate!', ingredientes: ['1 abacate maduro', '3 col. cacau em pó', '3 col. mel ou adoçante'], modo_preparo: ['Bater tudo no processador até ficar sedoso e gelar.'] },
  { id: 'd20', titulo: 'Bolo de Cenoura na Caneca com Vulcão de Chocolate', categoria: 'doces', tempo: '4 min', rendimento: '1 caneca', calorias: '260 kcal', dificuldade: 'Fácil', descricao: 'O clássico brasileiro versão individual.', ingredientes: ['3 col. cenoura ralada', '1 ovo', '2 col. óleo', '3 col. farinha', '2 col. açúcar', 'Calda chocolate'], modo_preparo: ['Bater cenoura, ovo e óleo, misturar farinha e açúcar, assar 1m 40s no micro-ondas e cobrir com calda.'] }
];

export default function App() {
  const [categoria, setCategoria] = useState('cafe');
  const [busca, setBusca] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const [apenasFavoritos, setApenasFavoritos] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const [ingredientesMarcados, setIngredientesMarcados] = useState({});
  const [passosConcluidos, setPassosConcluidos] = useState({});

  const toggleFavorito = (id) => {
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleIngrediente = (idx) => {
    setIngredientesMarcados(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const togglePasso = (idx) => {
    setPassosConcluidos(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const abrirReceita = (rec) => {
    setReceitaSelecionada(rec);
    setIngredientesMarcados({});
    setPassosConcluidos({});
  };

  const receitasFiltradas = RECEITAS_INICIAIS.filter(r => {
    const bateCategoria = apenasFavoritos ? favoritos.includes(r.id) : r.categoria === categoria;
    const bateBusca = r.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                      r.descricao.toLowerCase().includes(busca.toLowerCase());
    return bateCategoria && bateBusca;
  });

  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-800 font-sans pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 text-white shadow-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Prático & Saboroso</h1>
              <p className="text-xs text-amber-100 font-medium">Sua Plataforma Premium de Receitas</p>
            </div>
          </div>
          <button 
            onClick={() => setApenasFavoritos(!apenasFavoritos)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              apenasFavoritos ? 'bg-white text-orange-600 shadow' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${apenasFavoritos ? 'fill-orange-600' : ''}`} />
            <span>Favoritos ({favoritos.length})</span>
          </button>
        </div>
      </header>

      {/* BUSCA E NAVEGAÇÃO DE CATEGORIAS */}
      <main className="max-w-5xl mx-auto px-4 mt-6">
        <div className="relative mb-6">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por ingredientes, nome da receita ou prato..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white rounded-xl shadow-sm border border-amber-200/60 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          />
        </div>

        {/* CARDS DE NAVEGAÇÃO DE CATEGORIAS */}
        {!apenasFavoritos && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { id: 'cafe', nome: 'Café da Manhã', icon: Coffee, cor: 'from-amber-400 to-orange-400' },
              { id: 'almoco', nome: 'Almoço', icon: Sun, cor: 'from-orange-500 to-amber-600' },
              { id: 'janta', nome: 'Janta', icon: Moon, cor: 'from-amber-700 to-orange-800' },
              { id: 'doces', nome: 'Doces', icon: Dessert, cor: 'from-pink-500 to-rose-500' },
            ].map(cat => {
              const Icon = cat.icon;
              const ativo = categoria === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setCategoria(cat.id); setApenasFavoritos(false); }}
                  className={`p-3.5 rounded-xl transition-all text-left flex flex-col justify-between shadow-sm relative overflow-hidden ${
                    ativo ? 'bg-gradient-to-br ' + cat.cor + ' text-white ring-2 ring-orange-500 shadow-md scale-[1.02]' : 'bg-white hover:bg-amber-100/50 text-slate-700 border border-amber-200/50'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${ativo ? 'text-white' : 'text-orange-500'}`} />
                  <div>
                    <div className="text-xs font-medium opacity-80">20 Receitas</div>
                    <div className="font-bold text-sm leading-tight">{cat.nome}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* LISTA DE RECEITAS */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            {apenasFavoritos ? 'Suas Receitas Favoritas' : `Receitas de ${categoria === 'cafe' ? 'Café da Manhã' : categoria === 'almoco' ? 'Almoço' : categoria === 'janta' ? 'Janta' : 'Doces'}`}
            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 font-bold rounded-full">
              {receitasFiltradas.length}
            </span>
          </h2>
        </div>

        {receitasFiltradas.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-amber-200/60 shadow-sm">
            <Utensils className="w-12 h-12 mx-auto text-amber-300 mb-2" />
            <p className="text-slate-600 font-medium">Nenhuma receita encontrada nessa busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {receitasFiltradas.map((rec) => {
              const isFav = favoritos.includes(rec.id);
              return (
                <div 
                  key={rec.id}
                  onClick={() => abrirReceita(rec)}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer border border-amber-100 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-slate-800 text-base group-hover:text-orange-600 transition leading-snug">
                        {rec.titulo}
                      </h3>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorito(rec.id); }}
                        className="p-1.5 rounded-full hover:bg-amber-50 text-slate-400 hover:text-rose-500"
                      >
                        <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">{rec.descricao}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-orange-500" /> {rec.tempo}</span>
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-amber-500" /> {rec.calorias}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold">{rec.dificuldade}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* MODAL DETALHADO DA RECEITA */}
      {receitaSelecionada && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setReceitaSelecionada(null)}
              className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pr-8">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                {receitaSelecionada.categoria}
              </span>
              <h2 className="text-2xl font-black text-slate-800 mt-2">{receitaSelecionada.titulo}</h2>
              <p className="text-sm text-slate-600 mt-1">{receitaSelecionada.descricao}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 my-5 p-3 bg-amber-50/60 rounded-xl text-center text-xs font-semibold text-slate-700">
              <div><span className="block text-slate-400 text-[10px]">PREPARO</span>{receitaSelecionada.tempo}</div>
              <div><span className="block text-slate-400 text-[10px]">RENDIMENTO</span>{receitaSelecionada.rendimento}</div>
              <div><span className="block text-slate-400 text-[10px]">CALORIAS</span>{receitaSelecionada.calorias}</div>
            </div>

            {/* SEÇÃO DE INGREDIENTES */}
            <div className="mb-6">
              <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-orange-500" /> Ingredientes
                <span className="text-xs font-normal text-slate-400">(marque o que separar)</span>
              </h3>
              <div className="space-y-2">
                {receitaSelecionada.ingredientes.map((ing, idx) => {
                  const marcado = ingredientesMarcados[idx];
                  return (
                    <div 
                      key={idx}
                      onClick={() => toggleIngrediente(idx)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer text-sm transition ${
                        marcado ? 'bg-emerald-50 text-emerald-800 line-through opacity-70' : 'bg-slate-50 hover:bg-amber-50/50 text-slate-700'
                      }`}
                    >
                      {marcado ? <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                      <span>{ing}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEÇÃO DE MODO DE PREPARO */}
            <div>
              <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-orange-500" /> Modo de Preparo
              </h3>
              <div className="space-y-3">
                {receitaSelecionada.modo_preparo.map((passo, idx) => {
                  const concluido = passosConcluidos[idx];
                  return (
                    <div 
                      key={idx}
                      onClick={() => togglePasso(idx)}
                      className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 text-sm ${
                        concluido ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-white border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        concluido ? 'bg-emerald-600 text-white' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <p className="pt-0.5 leading-relaxed">{passo}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
