/* =====================================================================
   BASE DE DADOS EM MEMÓRIA
   São os mesmos registros que o script sql/02_dml.sql insere no banco.
   Mantivemos iguais para o protótipo e o modelo de dados baterem.
   ===================================================================== */
const BD = {
  cursos:[
    {id:1,nome:'Análise e Desenvolvimento de Sistemas'},
    {id:2,nome:'Sistemas para Internet'},
    {id:3,nome:'Ciência da Computação'},
    {id:4,nome:'Sistemas de Informação'},
    {id:5,nome:'Licenciatura em Computação'}],
  regimes:[
    {cod:'HORISTA',desc:'Horista',max:160},
    {cod:'PARCIAL',desc:'Tempo parcial',max:320},
    {cod:'INTEGRAL',desc:'Dedicação exclusiva',max:480}],
  /* 1 a 4 alunos | 5 a 8 docentes | 9 e 10 pessoas jurídicas,
     que são os dois fornecedores. Toda pessoa física é aluno ou docente. */
  pessoas:[
    {id:1,nome:'Lorenzo Gonçalves',end:'Rua Apollo Melo, 981 - Recife/PE',email:'lorenzo.goncalves@uni.edu.br',tel:'(81) 92183-2200',tipo:'FISICA',sit:'ATIVO'},
    {id:2,nome:'Maya Azevedo',end:'Rua Henry Gabriel Teixeira, 1584 - Recife/PE',email:'maya.azevedo@uni.edu.br',tel:'(81) 93911-0653',tipo:'FISICA',sit:'ATIVO'},
    {id:3,nome:'Maria Laura Câmara',end:'Avenida Isabel Casa Grande, 308 - Recife/PE',email:'maria.camara@uni.edu.br',tel:'(81) 93369-8002',tipo:'FISICA',sit:'ATIVO'},
    {id:4,nome:'Fernando Pacheco',end:'Alameda Caio Carvalho, 108 - Recife/PE',email:'fernando.pacheco@uni.edu.br',tel:'(81) 98733-6535',tipo:'FISICA',sit:'INATIVO'},
    {id:5,nome:'Leonardo Oliveira',end:'Alameda Davi Carvalho, 87 - Recife/PE',email:'leonardo.oliveira@uni.edu.br',tel:'(81) 3901-7297',tipo:'FISICA',sit:'ATIVO'},
    {id:6,nome:'Sabrina Cunha',end:'Alameda Ravi Nascimento, 144 - Recife/PE',email:'sabrina.cunha@uni.edu.br',tel:'(81) 3016-9472',tipo:'FISICA',sit:'ATIVO'},
    {id:7,nome:'Murilo Mota',end:'Rua Manuela Moura, 493 - Recife/PE',email:'murilo.mota@uni.edu.br',tel:'(81) 3342-8788',tipo:'FISICA',sit:'ATIVO'},
    {id:8,nome:'Antonella Cassiano',end:'Travessa Júlia Costela, 1519 - Recife/PE',email:'antonella.cassiano@uni.edu.br',tel:'(81) 3974-7525',tipo:'FISICA',sit:'ATIVO'},
    {id:9,nome:'TecnoInfo Suprimentos',end:'Rua Thales Costela, 822 - Recife/PE',email:'comercial@tecnoinfo.exemplo.br',tel:'(81) 3844-6638',tipo:'JURIDICA',sit:'ATIVO'},
    {id:10,nome:'MóveisPro Corporativo',end:'Rua Ágatha Araújo, 450 - Recife/PE',email:'atendimento@moveispro.exemplo.br',tel:'(81) 3450-6387',tipo:'JURIDICA',sit:'ATIVO'}],
  /* CPFs e CNPJs inventados, com dígito verificador calculado pelo
     módulo 11 — os mesmos do script sql/02_dml.sql. */
  pf:[
    {id:1,cpf:'01824975694',nasc:'2004-03-17'},{id:2,cpf:'31604782544',nasc:'2003-11-02'},
    {id:3,cpf:'08273196496',nasc:'2005-06-25'},{id:4,cpf:'93504672838',nasc:'2002-09-09'},
    {id:5,cpf:'74652031807',nasc:'1979-08-12'},{id:6,cpf:'42376509106',nasc:'1982-02-27'},
    {id:7,cpf:'26453980738',nasc:'1975-10-05'},{id:8,cpf:'39084125797',nasc:'1988-06-19'}],
  pj:[
    {id:9,cnpj:'80459276000171',razao:'TecnoInfo Comércio de Suprimentos LTDA'},
    {id:10,cnpj:'63847205000127',razao:'MóveisPro Indústria e Comércio LTDA'}],
  alunos:[
    {id:1,mat:'2026000001',curso:1,ingresso:'2026-02-10'},
    {id:2,mat:'2026000002',curso:1,ingresso:'2026-02-10'},
    {id:3,mat:'2026000003',curso:2,ingresso:'2026-02-10'},
    {id:4,mat:'2026000004',curso:3,ingresso:'2026-08-03'}],
  docentes:[
    {id:5,cod:'DOC00001',tit:'DOUTORADO',area:'Engenharia de Software',regime:'INTEGRAL'},
    {id:6,cod:'DOC00002',tit:'MESTRADO',area:'Banco de Dados',regime:'PARCIAL'},
    {id:7,cod:'DOC00003',tit:'DOUTORADO',area:'Redes de Computadores',regime:'INTEGRAL'},
    {id:8,cod:'DOC00004',tit:'ESPECIALIZACAO',area:'Programação Web',regime:'HORISTA'}],
  disciplinas:[
    {id:1,cod:'ADS0101',nome:'Algoritmos e Lógica de Programação',ch:80,per:'2026/2',curso:1},
    {id:2,cod:'ADS0102',nome:'Programação Orientada a Objetos',ch:80,per:'2026/2',curso:1},
    {id:3,cod:'ADS0103',nome:'Banco de Dados I',ch:60,per:'2026/2',curso:1},
    {id:4,cod:'ADS0104',nome:'Engenharia de Software',ch:60,per:'2026/2',curso:1},
    {id:5,cod:'ADS0105',nome:'Análise e Projeto de Sistemas',ch:60,per:'2026/2',curso:1},
    {id:6,cod:'SPI0201',nome:'Desenvolvimento Web Front-end',ch:80,per:'2026/2',curso:2},
    {id:7,cod:'SPI0202',nome:'Interface e Experiência do Usuário',ch:40,per:'2026/2',curso:2},
    {id:8,cod:'CCO0301',nome:'Redes de Computadores',ch:80,per:'2026/2',curso:3},
    {id:9,cod:'CCO0302',nome:'Sistemas Operacionais',ch:60,per:'2026/2',curso:3},
    /* ADS0101, ADS0105, ADS0106 e SPI0203 ficam sem docente: são as que
       a tela de atribuição (UC04) oferece como disponíveis no período. */
    {id:10,cod:'ADS0106',nome:'Estruturas de Dados',ch:40,per:'2026/2',curso:1},
    {id:11,cod:'SPI0203',nome:'Desenvolvimento Web Back-end',ch:60,per:'2026/2',curso:2}],
  alocacoes:[
    {doc:5,disc:2},{doc:5,disc:4},{doc:6,disc:3},
    {doc:7,disc:8},{doc:7,disc:9},{doc:8,disc:6},{doc:8,disc:7}],
  fornecedores:[
    {id:9,limite:150000,req:'Entrega em até 15 dias; garantia mínima de 12 meses; nota fiscal eletrônica.',cat:'Informática',homolog:'2026-03-05'},
    {id:10,limite:220000,req:'Montagem inclusa; garantia de 24 meses; certificação NBR 13962.',cat:'Mobiliário',homolog:'2026-04-02'}],
  requisitos:[
    {id:1,desc:'Aquisição de 30 notebooks para o laboratório de desenvolvimento.',cat:'Informática',prazo:30,valor:135000,sit:'EM_COTACAO'},
    {id:2,desc:'Substituição de 120 cadeiras das salas de aula do bloco B.',cat:'Mobiliário',prazo:45,valor:96000,sit:'EM_COTACAO'}],
  pedidos:[
    {id:1,num:'PED-2026001',req:1,forn:9,data:'2026-08-10',status:'APROVADO',
     itens:[{d:'Notebook 16GB RAM / SSD 512GB / i7',q:30,v:4200},{d:'Base refrigerada para notebook',q:30,v:89.90}],
     val:{res:'APROVADO',parecer:'Proposta dentro do valor estimado e do prazo de 30 dias definido no requisito.',data:'2026-08-15'}},
    {id:2,num:'PED-2026002',req:2,forn:10,data:'2026-08-12',status:'REPROVADO',
     itens:[{d:'Cadeira giratória ergonômica com apoio',q:120,v:690},{d:'Frete e montagem no local',q:1,v:3500}],
     val:{res:'REPROVADO',parecer:'Valor apresentado supera em 12% o estimado e o prazo de entrega excede 45 dias.',data:'2026-08-19'}},
    /* Segunda proposta para o mesmo requisito, depois da reprovação da primeira. */
    {id:3,num:'PED-2026003',req:2,forn:10,data:'2026-08-20',status:'APRESENTADO',
     itens:[{d:'Cadeira giratória ergonômica com apoio',q:120,v:610},{d:'Frete e montagem no local',q:1,v:2900}],val:null},
    {id:4,num:'PED-2026004',req:1,forn:9,data:'2026-08-25',status:'RASCUNHO',
     itens:[{d:'Notebook 16GB RAM / SSD 512GB / i7',q:10,v:4250},{d:'Mochila para notebook 15 polegadas',q:10,v:129.90}],val:null}],
  log:[
    {data:'18/08/2026 10:22',tab:'pessoa',reg:3,op:'ATUALIZACAO',campo:'endereco',ant:'Avenida Luana Siqueira, 82 - Recife/PE',novo:'Avenida Isabel Casa Grande, 308 - Recife/PE',user:'Administrador do Sistema'},
    {data:'18/08/2026 10:22',tab:'pessoa',reg:3,op:'ATUALIZACAO',campo:'telefone',ant:'(81) 98333-7712',novo:'(81) 93369-8002',user:'Administrador do Sistema'},
    {data:'21/08/2026 14:05',tab:'aluno',reg:2,op:'ATUALIZACAO',campo:'id_curso',ant:'Sistemas de Informação',novo:'Análise e Desenvolvimento de Sistemas',user:'Administrador do Sistema'},
    {data:'24/08/2026 09:40',tab:'pessoa',reg:4,op:'INATIVACAO',campo:'situacao',ant:'ATIVO',novo:'INATIVO',user:'Administrador do Sistema'},
    {data:'25/08/2026 11:18',tab:'pessoa',reg:2,op:'INATIVACAO',campo:'situacao',ant:'ATIVO',novo:'INATIVO',user:'Administrador do Sistema'},
    {data:'28/08/2026 08:05',tab:'pessoa',reg:2,op:'REATIVACAO',campo:'situacao',ant:'INATIVO',novo:'ATIVO',user:'Administrador do Sistema'}]
};

/* ------------------- SESSÃO E MENU -------------------
   O sistema tem um usuário só, o admin. A senha 12345 é de
   demonstração; no banco ela fica só como hash BCrypt. */
const CREDENCIAL = { login:'admin', senha:'12345', nome:'Administrador do Sistema' };
const ROTULO_PERFIL = {
  SECRETARIO_ACADEMICO:'Secretário Acadêmico',
  COORDENADOR_CURSO:'Coordenador de Curso',
  ASSISTENTE_ADMINISTRATIVO:'Assistente Administrativo',
  GESTOR_PROJETO:'Gestor de Projeto',
  TODOS:'Todos os módulos'
};
const MENU = [
  {grupo:'Início',perfis:'*',itens:[{id:'home',rot:'Painel inicial'}]},
  {grupo:'Gestão de Alunos',perfis:['SECRETARIO_ACADEMICO'],itens:[
    {id:'aluno-lista',rot:'Consultar alunos',uc:'UC'},
    {id:'aluno-form',rot:'Cadastrar aluno',uc:'UC01'}]},
  {grupo:'Gestão de Docentes',perfis:['COORDENADOR_CURSO'],itens:[
    {id:'docente-lista',rot:'Consultar docentes',uc:'UC'},
    {id:'docente-form',rot:'Cadastrar docente',uc:'UC03'},
    {id:'docente-atribuir',rot:'Atribuir disciplina',uc:'UC04'}]},
  {grupo:'Pessoas Físicas',perfis:['ASSISTENTE_ADMINISTRATIVO'],itens:[
    {id:'pf-lista',rot:'Consultar pessoas físicas'},
    {id:'pf-form',rot:'Cadastrar pessoa física'}]},
  {grupo:'Pessoas Jurídicas',perfis:['ASSISTENTE_ADMINISTRATIVO'],itens:[
    {id:'pj-lista',rot:'Consultar pessoas jurídicas'},
    {id:'pj-form',rot:'Cadastrar pessoa jurídica'}]},
  {grupo:'Fornecedores',perfis:['ASSISTENTE_ADMINISTRATIVO'],itens:[
    {id:'forn-lista',rot:'Consultar fornecedores'},
    {id:'forn-form',rot:'Cadastrar fornecedor'}]},
  {grupo:'Processo de Fornecimento',perfis:['GESTOR_PROJETO'],itens:[
    {id:'req-lista',rot:'Requisitos de fornecimento'},
    {id:'forn-busca',rot:'Procurar fornecedores'},
    {id:'pedido-lista',rot:'Pedidos'},
    {id:'pedido-validacao',rot:'Validação de pedidos'}]},
  {grupo:'Auditoria',perfis:'*',itens:[{id:'auditoria',rot:'Registro de alterações'}]}
];

let sessao = {perfil:'TODOS',nome:''};
let telaAtual = 'home';
let ctx = {};

function entrar(){
  const u = document.getElementById('login-user').value.trim();
  const s = document.getElementById('login-senha').value;
  const msg = document.getElementById('login-msg');
  if(u !== CREDENCIAL.login || s !== CREDENCIAL.senha){
    msg.innerHTML = '<strong>Credenciais inválidas</strong>Usuário ou senha incorretos. O acesso não foi autorizado.';
    msg.classList.add('ver');
    return;
  }
  msg.classList.remove('ver');
  sessao.perfil = document.getElementById('login-perfil').value;
  sessao.nome = CREDENCIAL.nome;
  document.getElementById('tela-login').style.display='none';
  document.getElementById('app').classList.add('ativo');
  document.getElementById('hd-nome').textContent = sessao.nome;
  document.getElementById('hd-perfil').textContent = ROTULO_PERFIL[sessao.perfil];
  montarMenu(); ir('home');
}
function sair(){
  document.getElementById('app').classList.remove('ativo');
  document.getElementById('tela-login').style.display='flex';
}
function podeVer(g){ return g.perfis==='*' || sessao.perfil==='TODOS' || g.perfis.includes(sessao.perfil); }
function montarMenu(){
  let h='';
  MENU.filter(podeVer).forEach(g=>{
    h += `<div class="grupo">${g.grupo}</div>`;
    g.itens.forEach(i=>{
      h += `<a href="#" data-tela="${i.id}" onclick="ir('${i.id}');return false">${i.rot}`+
           (i.uc&&i.uc!=='UC'?`<span class="uc">${i.uc}</span>`:'')+`</a>`;
    });
  });
  document.getElementById('menu').innerHTML = h;
}
function ir(tela,dados){
  telaAtual = tela; ctx = dados||{};
  document.querySelectorAll('#menu a').forEach(a=>a.classList.toggle('sel',a.dataset.tela===tela));
  document.getElementById('conteudo').innerHTML = TELAS[tela]();
  document.getElementById('conteudo').scrollTop = 0;
  try{ history.replaceState(null,'','#'+tela); }catch(e){}
}

/* Atalhos de navegação direta.
   index.html#aluno-lista  abre a tela correspondente já autenticado.
   index.html#ca01 / #ca02 / #ca04 reproduzem os cenários alternativos
   descritos nos casos de uso da 1ª etapa. */
const DEMOS = {
  ca01(){ // CA01-A — CPF já cadastrado
    ir('aluno-form');
    document.getElementById('c-nome').value  = 'Lorenzo Gonçalves';
    document.getElementById('c-cpf').value   = '01824975694';
    document.getElementById('c-nasc').value  = '2004-03-17';
    document.getElementById('c-tel').value   = '(81) 92183-2200';
    document.getElementById('c-end').value   = 'Rua Apollo Melo, 981 - Recife/PE';
    document.getElementById('c-email').value = 'lorenzo.goncalves2@uni.edu.br';
    salvarAluno(null);
  },
  ca02(){ ir('aluno-lista',{busca:'2026000099'}); },   // CA02-A — aluno não encontrado
  ca04(){ ir('docente-atribuir',{id:8}); atribuir(8,5); } // CA04-A — carga horária excedida
};
window.addEventListener('DOMContentLoaded',()=>{
  const h = (location.hash||'').replace('#','');
  if(!h) return;
  if(DEMOS[h]){ entrar(); DEMOS[h](); }
  else if(TELAS[h]){ entrar(); ir(h); }
});

/* ------------------- UTILITÁRIOS ------------------- */
const P  = id => BD.pessoas.find(p=>p.id===id) || {};
const PF = id => BD.pf.find(p=>p.id===id) || {};
const PJ = id => BD.pj.find(p=>p.id===id) || {};
const curso = id => (BD.cursos.find(c=>c.id===id)||{}).nome || '—';
const regime = cod => BD.regimes.find(r=>r.cod===cod) || {desc:'—',max:0};

/* No banco a titulacao e a situacao do requisito sao ENUM em caixa alta,
   que e a convencao para valor de codigo. Quem traduz para o texto que o
   usuario le e a interface, nao o banco. */
const ROTULO_TITULACAO = {
  GRADUACAO:'Graduação', ESPECIALIZACAO:'Especialização', MESTRADO:'Mestrado',
  DOUTORADO:'Doutorado', POS_DOUTORADO:'Pós-Doutorado'
};
const ROTULO_SIT_REQUISITO = { ABERTO:'Aberto', EM_COTACAO:'Em cotação', ENCERRADO:'Encerrado' };
const titulacao = cod => ROTULO_TITULACAO[cod] || cod;
const disc = id => BD.disciplinas.find(d=>d.id===id) || {};
const moeda = v => 'R$ '+v.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtCPF  = c => c.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4');
const fmtCNPJ = c => c.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,'$1.$2.$3/$4-$5');

/* Valida o CPF pelo algoritmo do módulo 11 (o mesmo da Receita Federal).
   É a operação validarUnicidadeCPF() da classe PessoaFisica: além de não
   poder repetir, o número precisa ser válido. */
function validarCPF(cpf){
  const c = (cpf||'').replace(/\D/g,'');
  if(c.length !== 11) return false;
  if(/^(\d)\1{10}$/.test(c)) return false;      // 000...0, 111...1 etc.
  for(const n of [9,10]){
    let soma = 0;
    for(let i=0;i<n;i++) soma += Number(c[i]) * ((n+1)-i);
    const resto = soma % 11;
    const dv = resto < 2 ? 0 : 11 - resto;
    if(Number(c[n]) !== dv) return false;
  }
  return true;
}

/* Mesma ideia para o CNPJ, mudando só os pesos. */
function validarCNPJ(cnpj){
  const c = (cnpj||'').replace(/\D/g,'');
  if(c.length !== 14) return false;
  if(/^(\d)\1{13}$/.test(c)) return false;
  const pesos1 = [5,4,3,2,9,8,7,6,5,4,3,2];
  const pesos2 = [6,...pesos1];
  for(const [n,pesos] of [[12,pesos1],[13,pesos2]]){
    let soma = 0;
    for(let i=0;i<n;i++) soma += Number(c[i]) * pesos[i];
    const resto = soma % 11;
    const dv = resto < 2 ? 0 : 11 - resto;
    if(Number(c[n]) !== dv) return false;
  }
  return true;
}
const dataBR = d => d ? d.split('-').reverse().join('/') : '—';
const tagSit = s => `<span class="tag ${s==='ATIVO'||s==='ATIVA'?'t-ativo':'t-inativo'}">${s}</span>`;
const totalPedido = p => p.itens.reduce((s,i)=>s+i.q*i.v,0);
function cargaDocente(id){
  return BD.alocacoes.filter(a=>a.doc===id).reduce((s,a)=>s+disc(a.disc).ch,0);
}
function cab(bread,titulo,desc){
  return `<div class="breadcrumb">${bread}</div><h2 class="tela">${titulo}</h2><p class="descricao">${desc}</p>`;
}
function rodape(txt){ return `<div class="rodape-uc">${txt}</div>`; }
function registrarLog(tab,reg,op,campo,ant,novo){
  const agora = new Date();
  const d = agora.toISOString().slice(0,10).split('-').reverse().join('/');
  const h = agora.toTimeString().slice(0,5);
  BD.log.unshift({data:`${d} ${h}`,tab,reg,op,campo,ant,novo,user:sessao.nome});
}

/* =====================================================================
   TELAS DO PROTÓTIPO
   ===================================================================== */
const TELAS = {};

/* --------- TELA 02 — PAINEL INICIAL --------- */
TELAS['home'] = () => {
  const ativos = BD.alunos.filter(a=>P(a.id).sit==='ATIVO').length;
  const pendentes = BD.pedidos.filter(p=>!p.val).length;
  const semDoc = BD.disciplinas.filter(d=>!BD.alocacoes.some(a=>a.disc===d.id)).length;
  const mods = [
    {c:'',t:'Gestão de Alunos',a:'Secretário Acadêmico',u:['Cadastrar Aluno (UC01)','Consultar Aluno','Atualizar Dados do Aluno (UC02)','Inativar Aluno'],l:'aluno-lista'},
    {c:'m-doc',t:'Gestão de Docentes',a:'Coordenador de Curso',u:['Cadastrar Docente (UC03)','Consultar Docente','Atribuir Disciplina ao Docente (UC04)','Inativar Docente'],l:'docente-lista'},
    {c:'m-pf',t:'Gestão de Pessoas Físicas',a:'Assistente Administrativo',u:['Cadastrar Pessoa Física','Consultar Pessoa Física','Atualizar Pessoa Física','Inativar Pessoa Física'],l:'pf-lista'},
    {c:'m-pj',t:'Gestão de Pessoas Jurídicas',a:'Assistente Administrativo',u:['Cadastrar Pessoa Jurídica','Consultar Pessoa Jurídica','Atualizar Pessoa Jurídica','Inativar Pessoa Jurídica'],l:'pj-lista'},
    {c:'m-forn',t:'Gestão de Fornecedores',a:'Assistente Administrativo',u:['Cadastrar Fornecedor','Consultar Fornecedor','Atualizar Fornecedor','Inativar Fornecedor'],l:'forn-lista'},
    {c:'m-forn',t:'Processo de Fornecimento',a:'Gestor de Projeto',u:['Estabelecer Requisitos','Procurar Fornecedores','Realizar Pedido','Apresentação e Validação'],l:'req-lista'}
  ];
  return cab('Início','Painel inicial',
    `Bem-vindo(a), ${sessao.nome}. Perfil ativo: <b>${ROTULO_PERFIL[sessao.perfil]}</b>.`)+
    `<div class="kpis">
      <div class="kpi"><div class="n">${ativos}</div><div class="l">Alunos ativos</div></div>
      <div class="kpi"><div class="n">${BD.docentes.length}</div><div class="l">Docentes</div></div>
      <div class="kpi"><div class="n">${semDoc}</div><div class="l">Disciplinas sem docente</div></div>
      <div class="kpi"><div class="n">${pendentes}</div><div class="l">Pedidos aguardando validação</div></div>
    </div>
    <div class="modulos">`+
    mods.map(m=>`<div class="modulo ${m.c}"><h4>${m.t}</h4><div class="ator">Ator: ${m.a}</div>
      <ul>${m.u.map(x=>`<li>${x}</li>`).join('')}</ul>
      <a href="#" onclick="ir('${m.l}');return false">Acessar módulo →</a></div>`).join('')+
    `</div>`+
    rodape('Painel construído a partir do <b>Diagrama de Caso de Uso</b> da 1ª etapa: cada cartão corresponde a um pacote de casos de uso e ao seu ator responsável.');
};

/* --------- TELA 03 — CONSULTAR ALUNO --------- */
TELAS['aluno-lista'] = () => {
  const busca = (ctx.busca||'').toLowerCase().trim();
  const filtroCurso = ctx.curso||'Todos';
  const filtroSit   = ctx.sit||'Todas';
  const linhas = BD.alunos.filter(a=>{
    const p = P(a.id);
    const bate = !busca || p.nome.toLowerCase().includes(busca) || a.mat.includes(busca)
              || PF(a.id).cpf.includes(busca.replace(/\D/g,''));
    return bate
        && (filtroCurso==='Todos' || curso(a.curso)===filtroCurso)
        && (filtroSit==='Todas'   || p.sit===filtroSit);
  });
  return cab('Gestão de Alunos › Consultar','Consultar alunos',
    'Localização de alunos por matrícula, nome ou CPF. Corresponde ao passo 2 do UC02 e ao caso de uso Consultar Aluno.')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    `<div class="card">
      <div class="barra">
        <div class="campo" style="flex:2"><label for="f-busca">Matrícula, nome ou CPF</label>
          <input id="f-busca" value="${ctx.busca||''}" placeholder="Ex.: 2026000003 ou Maria Laura"></div>
        <div class="campo"><label for="f-curso">Curso</label>
          <select id="f-curso"><option>Todos</option>${BD.cursos.map(c=>`<option ${c.nome===filtroCurso?'selected':''}>${c.nome}</option>`).join('')}</select></div>
        <div class="campo"><label for="f-sit">Situação</label>
          <select id="f-sit">${['Todas','ATIVO','INATIVO'].map(o=>`<option ${o===filtroSit?'selected':''}>${o}</option>`).join('')}</select></div>
        <button class="btn btn-1" onclick="ir('aluno-lista',{busca:document.getElementById('f-busca').value,curso:document.getElementById('f-curso').value,sit:document.getElementById('f-sit').value})">Pesquisar</button>
        <button class="btn btn-2" onclick="ir('aluno-lista')">Limpar</button>
        <button class="btn btn-ok" onclick="ir('aluno-form')">+ Novo cadastro</button>
      </div>
      <table><thead><tr><th>Matrícula</th><th>Nome</th><th>CPF</th><th>Curso</th><th>E-mail</th><th>Situação</th><th></th></tr></thead>
      <tbody>`+
      (linhas.length?linhas.map(a=>{const p=P(a.id);return `<tr>
        <td><b>${a.mat}</b></td><td>${p.nome}</td><td>${fmtCPF(PF(a.id).cpf)}</td>
        <td>${curso(a.curso)}</td><td>${p.email}</td><td>${tagSit(p.sit)}</td>
        <td style="white-space:nowrap">
          <button class="btn-mini" onclick="ir('aluno-detalhe',{id:${a.id}})">Ver</button>
          <button class="btn-mini" onclick="ir('aluno-form',{id:${a.id}})">Editar</button>
          ${p.sit==='ATIVO'
            ?`<button class="btn-mini perigo" onclick="inativarPessoa(${a.id},'aluno-lista')">Inativar</button>`
            :`<button class="btn-mini ok" onclick="reativarPessoa(${a.id},'aluno-lista')">Reativar</button>`}
        </td></tr>`}).join('')
      :`<tr><td colspan="7" class="vazio">CA02-A: nenhum registro foi encontrado com os dados informados. Verifique os dados e realize nova busca.</td></tr>`)+
      `</tbody></table>
    </div>`+
    rodape('Casos de uso atendidos: <b>Consultar Aluno</b>, <b>Atualizar Dados do Aluno (UC02)</b> e <b>Inativar Aluno</b>. Como a inativação é lógica, o registro inativo mostra a ação <b>Reativar</b>. Consulta SQL: <code>SELECT ... FROM vw_aluno</code>.');
};

/* --------- TELA 04 — VISUALIZAR ALUNO ---------
   Corresponde ao passo 3 do UC02: "O sistema exibe os dados atuais do
   aluno em modo de visualização". Só depois disso é que o secretário
   escolhe a opção Editar (passo 4). */
TELAS['aluno-detalhe'] = () => {
  const id = ctx.id || BD.alunos[2].id;   // sem id (acesso direto pelo #), abre um aluno de exemplo
  const a = BD.alunos.find(x=>x.id===id);
  const p = P(id), f = PF(id);
  const historico = BD.log.filter(l =>
    (l.tab==='pessoa' && l.reg===id) || (l.tab==='aluno' && l.reg===id));
  const linha = (rot, val) =>
    `<tr><th style="width:210px;background:#fff;text-transform:none;font-size:12px;
       color:var(--texto-fraco);letter-spacing:0;border-bottom:1px solid #edf1f5">${rot}</th>
     <td>${val}</td></tr>`;
  return cab('Gestão de Alunos › Consultar › Detalhe','Dados do aluno',
    'UC02, passo 3 — o sistema exibe os dados atuais do aluno em modo de visualização.')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    `<div class="card">
      <h3>Identificação</h3>
      <table><tbody>
        ${linha('Matrícula', '<b>'+a.mat+'</b>')}
        ${linha('Nome completo', p.nome)}
        ${linha('CPF', fmtCPF(f.cpf))}
        ${linha('Data de nascimento', dataBR(f.nasc))}
        ${linha('Situação', tagSit(p.sit))}
      </tbody></table>
     </div>
     <div class="card">
      <h3>Contato</h3>
      <table><tbody>
        ${linha('E-mail', p.email)}
        ${linha('Telefone', p.tel)}
        ${linha('Endereço', p.end)}
      </tbody></table>
     </div>
     <div class="card">
      <h3>Dados acadêmicos</h3>
      <table><tbody>
        ${linha('Curso', curso(a.curso))}
        ${linha('Data de ingresso', dataBR(a.ingresso))}
      </tbody></table>
      <div class="acoes">
        <button class="btn btn-2" onclick="ir('aluno-lista')">Voltar</button>
        ${p.sit==='ATIVO'
          ?`<button class="btn btn-perigo" onclick="inativarPessoa(${id},'aluno-lista')">Inativar</button>`
          :`<button class="btn btn-ok" onclick="reativarPessoa(${id},'aluno-lista')">Reativar</button>`}
        <button class="btn btn-1" onclick="ir('aluno-form',{id:${id}})">Editar</button>
      </div>
     </div>
     <div class="card">
      <h3>Histórico de alterações deste aluno (${historico.length})</h3>
      <table><thead><tr><th>Data / hora</th><th>Campo</th><th>Valor anterior</th><th>Valor novo</th><th>Responsável</th></tr></thead>
      <tbody>`+
      (historico.length?historico.map(l=>`<tr><td style="white-space:nowrap">${l.data}</td><td>${l.campo}</td>
        <td style="font-size:12px;color:var(--texto-fraco)">${l.ant}</td>
        <td style="font-size:12px">${l.novo}</td><td style="font-size:12px">${l.user}</td></tr>`).join('')
      :`<tr><td colspan="5" class="vazio">Nenhuma alteração registrada para este aluno.</td></tr>`)+
      `</tbody></table>
     </div>`+
    rodape('Casos de uso: <b>Consultar Aluno</b> e passo 3 do <b>UC02</b>. O histórico vem da tabela <code>log_alteracao</code> filtrada por <code>id_registro</code>.');
};

/* --------- TELA 05 — CADASTRAR / ATUALIZAR ALUNO --------- */
TELAS['aluno-form'] = () => {
  const ed = !!ctx.id;
  const a = ed ? BD.alunos.find(x=>x.id===ctx.id) : {mat:'(gerada automaticamente)',curso:1,ingresso:''};
  const p = ed ? P(ctx.id) : {nome:'',end:'',email:'',tel:''};
  const f = ed ? PF(ctx.id) : {cpf:'',nasc:''};
  return cab('Gestão de Alunos › '+(ed?'Atualizar':'Novo cadastro'),
    ed?'Atualizar dados do aluno':'Cadastrar aluno',
    ed?'UC02 — Atualizar Dados do Aluno. Ator: Secretário Acadêmico.'
      :'UC01 — Cadastrar Aluno. Ator: Secretário Acadêmico. Campos marcados com * são obrigatórios.')+
    `<div class="msg msg-erro" id="msg-erro"></div>
     <div class="card">
      <h3>Dados pessoais</h3>
      <div class="grid g2">
        <div class="campo"><label for="c-nome">Nome completo <span class="obr">*</span></label><input id="c-nome" value="${p.nome}"></div>
        <div class="campo"><label for="c-cpf">CPF <span class="obr">*</span></label>
          <input id="c-cpf" maxlength="11" value="${f.cpf}" ${ed?'readonly style="background:#f4f6f8"':''}>
          <div class="dica">${ed?'O CPF não pode ser alterado após o cadastro.':'Somente números. O sistema verifica a unicidade do CPF (passo 5 do UC01).'}</div></div>
        <div class="campo"><label for="c-nasc">Data de nascimento <span class="obr">*</span></label><input type="date" id="c-nasc" value="${f.nasc}"></div>
        <div class="campo"><label for="c-tel">Telefone <span class="obr">*</span></label><input id="c-tel" value="${p.tel}" placeholder="(81) 90000-0000"></div>
        <div class="campo" style="grid-column:1/-1"><label for="c-end">Endereço <span class="obr">*</span></label><input id="c-end" value="${p.end}"></div>
        <div class="campo" style="grid-column:1/-1"><label for="c-email">E-mail <span class="obr">*</span></label><input id="c-email" value="${p.email}"></div>
      </div>
     </div>
     <div class="card">
      <h3>Dados acadêmicos</h3>
      <div class="grid g3">
        <div class="campo"><label for="c-mat">Matrícula</label>
          <input id="c-mat" value="${a.mat}" readonly style="background:#f4f6f8">
          <div class="dica">Gerada pelo sistema (passo 6 do UC01).</div></div>
        <div class="campo"><label for="c-curso">Curso pretendido <span class="obr">*</span></label>
          <select id="c-curso">${BD.cursos.map(c=>`<option value="${c.id}" ${c.id===a.curso?'selected':''}>${c.nome}</option>`).join('')}</select></div>
        <div class="campo"><label for="c-sit">Situação</label><input id="c-sit" value="${ed?P(ctx.id).sit:'ATIVO'}" readonly style="background:#f4f6f8"></div>
      </div>
      <div class="acoes">
        <button class="btn btn-2" onclick="ir('aluno-lista')">Cancelar</button>
        <button class="btn btn-1" onclick="salvarAluno(${ed?ctx.id:'null'})">${ed?'Salvar alterações':'Confirmar cadastro'}</button>
      </div>
     </div>`+
    rodape(ed
      ?'Pós-condição do UC02: os dados são atualizados e um <b>registro de alteração</b> é gerado com data, hora e responsável (tela de Auditoria).'
      :'Cenário alternativo <b>CA01-A</b>: informe o CPF <code>01824975694</code> (já cadastrado) para ver o bloqueio por duplicidade.');
};
function salvarAluno(id){
  const nome=v('c-nome'),cpf=v('c-cpf'),email=v('c-email'),tel=v('c-tel'),end=v('c-end'),nasc=v('c-nasc');
  const cursoId=+v('c-curso'), erro=document.getElementById('msg-erro');
  if(!nome||!email||!tel||!end||(!id&&(!cpf||!nasc))){
    erro.className='msg msg-erro ver';
    erro.innerHTML='<strong>Campos obrigatórios não preenchidos</strong>Informe todos os campos marcados com *.'; return;
  }
  if(!id){
    if(!validarCPF(cpf)){
      erro.className='msg msg-erro ver';
      erro.innerHTML='<strong>CPF inválido</strong>O número informado não passa na verificação dos dígitos '+
        'verificadores (módulo 11). Informe 11 dígitos numéricos de um CPF válido.';
      document.getElementById('c-cpf').classList.add('erro'); return;
    }
    if(BD.pf.some(x=>x.cpf===cpf)){
      const dono = P(BD.pf.find(x=>x.cpf===cpf).id);
      erro.className='msg msg-erro ver';
      erro.innerHTML=`<strong>CA01-A — CPF já cadastrado</strong>O CPF ${fmtCPF(cpf)} já pertence a <b>${dono.nome}</b>. `+
        `O cadastro não pode prosseguir. Corrija o CPF ou verifique se o aluno já está cadastrado. `+
        `<br><code>ERROR 1062 (23000): Duplicate entry '${cpf}' for key 'pessoa_fisica.uk_pessoa_fisica_cpf'</code>`;
      document.getElementById('c-cpf').classList.add('erro'); return;
    }
    const novoId = Math.max(...BD.pessoas.map(p=>p.id))+1;
    const mat = '2026'+String(novoId).padStart(6,'0');
    BD.pessoas.push({id:novoId,nome,end,email,tel,tipo:'FISICA',sit:'ATIVO'});
    BD.pf.push({id:novoId,cpf,nasc});
    BD.alunos.push({id:novoId,mat,curso:cursoId,ingresso:new Date().toISOString().slice(0,10)});
    registrarLog('aluno',novoId,'INSERCAO','—','—',mat);
    ir('aluno-lista',{msg:`<strong>Cadastro realizado com sucesso</strong>Aluno <b>${nome}</b> registrado com situação ATIVO. Matrícula gerada: <b>${mat}</b>.`});
  }else{
    const p=P(id), f=PF(id), al=BD.alunos.find(x=>x.id===id);
    if(p.end!==end) registrarLog('pessoa',id,'ATUALIZACAO','endereco',p.end,end);
    if(p.tel!==tel) registrarLog('pessoa',id,'ATUALIZACAO','telefone',p.tel,tel);
    if(p.email!==email) registrarLog('pessoa',id,'ATUALIZACAO','email',p.email,email);
    if(al.curso!==cursoId) registrarLog('aluno',id,'ATUALIZACAO','id_curso',curso(al.curso),curso(cursoId));
    p.nome=nome;p.end=end;p.email=email;p.tel=tel;f.nasc=nasc||f.nasc;al.curso=cursoId;
    // volta para a visualizacao, seguindo o passo 7 do UC02
    ir('aluno-detalhe',{id,msg:`<strong>Atualização concluída</strong>Os dados de <b>${nome}</b> foram atualizados e o registro de alteração foi gerado.`});
  }
}
const v = id => (document.getElementById(id)||{}).value || '';
function inativarPessoa(id,volta){
  const p=P(id);
  if(!confirm(`Confirma a inativação de "${p.nome}"?\n\nO registro permanece na base (exclusão lógica) e deixa de aparecer nas rotinas ativas.`)) return;
  p.sit='INATIVO';
  registrarLog('pessoa',id,'INATIVACAO','situacao','ATIVO','INATIVO');
  ir(volta,{msg:`<strong>Registro inativado</strong><b>${p.nome}</b> passou para a situação INATIVO. Comando executado: <code>UPDATE pessoa SET situacao='INATIVO' WHERE id_pessoa=${id};</code>`});
}

/* Como a inativação é lógica, ela tem volta: o registro continua na base
   e a reativação apenas o devolve às rotinas ativas. */
function reativarPessoa(id,volta){
  const p=P(id);
  if(!confirm(`Confirma a reativação de "${p.nome}"?\n\nO registro volta a aparecer nas rotinas ativas do sistema.`)) return;
  p.sit='ATIVO';
  registrarLog('pessoa',id,'REATIVACAO','situacao','INATIVO','ATIVO');
  ir(volta,{msg:`<strong>Registro reativado</strong><b>${p.nome}</b> voltou para a situação ATIVO. Comando executado: <code>UPDATE pessoa SET situacao='ATIVO' WHERE id_pessoa=${id};</code>`});
}

/* --------- TELA 06 — CONSULTAR DOCENTES --------- */
TELAS['docente-lista'] = () => {
  const busca = (ctx.busca||'').toLowerCase().trim();
  const area  = ctx.area||'Todas';
  const linhas = BD.docentes.filter(d=>{
    const p = P(d.id);
    const bateBusca = !busca || p.nome.toLowerCase().includes(busca) || d.cod.toLowerCase().includes(busca);
    return bateBusca && (area==='Todas' || d.area===area);
  });
  return cab('Gestão de Docentes › Consultar','Consultar docentes',
    'Relação de docentes com titulação, regime de trabalho e ocupação de carga horária. Ator: Coordenador de Curso.')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    `<div class="card">
      <div class="barra">
        <div class="campo" style="flex:2"><label for="f-doc">Código ou nome do docente</label>
          <input id="f-doc" value="${ctx.busca||''}" placeholder="Ex.: DOC00002 ou Sabrina"></div>
        <div class="campo"><label for="f-area">Área de atuação</label>
          <select id="f-area"><option>Todas</option>${[...new Set(BD.docentes.map(d=>d.area))].map(a=>`<option ${a===area?'selected':''}>${a}</option>`).join('')}</select></div>
        <button class="btn btn-1" onclick="ir('docente-lista',{busca:document.getElementById('f-doc').value,area:document.getElementById('f-area').value})">Pesquisar</button>
        <button class="btn btn-2" onclick="ir('docente-lista')">Limpar</button>
        <button class="btn btn-ok" onclick="ir('docente-form')">+ Novo cadastro</button>
      </div>
      <table><thead><tr><th>Código</th><th>Nome</th><th>Titulação</th><th>Área de atuação</th><th>Regime</th>
        <th style="width:170px">Carga horária</th><th>Situação</th><th></th></tr></thead><tbody>`+
      (linhas.length?linhas.map(d=>{
        const p=P(d.id), r=regime(d.regime), c=cargaDocente(d.id), pct=Math.round(c/r.max*100);
        const cls = pct>=90?'alto':pct>=70?'med':'';
        return `<tr><td><b>${d.cod}</b></td><td>${p.nome}</td><td>${titulacao(d.tit)}</td><td>${d.area}</td>
          <td>${r.desc}</td>
          <td>${c}h de ${r.max}h <span class="tag ${pct>=90?'t-erro':pct>=70?'t-alerta':'t-info'}">${pct}%</span>
            <div class="carga"><i class="${cls}" style="width:${pct}%"></i></div></td>
          <td>${tagSit(p.sit)}</td>
          <td style="white-space:nowrap">
            <button class="btn-mini" onclick="ir('docente-atribuir',{id:${d.id}})">Atribuir</button>
            ${p.sit==='ATIVO'
              ?`<button class="btn-mini perigo" onclick="inativarPessoa(${d.id},'docente-lista')">Inativar</button>`
              :`<button class="btn-mini ok" onclick="reativarPessoa(${d.id},'docente-lista')">Reativar</button>`}
          </td></tr>`}).join('')
      :`<tr><td colspan="8" class="vazio">Nenhum docente encontrado com os critérios informados.</td></tr>`)+
      `</tbody></table>
    </div>`+
    rodape('Casos de uso: <b>Consultar Docente</b> e <b>Inativar Docente</b>. Consulta SQL: <code>SELECT ... FROM vw_docente_carga</code>.');
};

/* --------- TELA 07 — CADASTRAR DOCENTE --------- */
TELAS['docente-form'] = () => {
  return cab('Gestão de Docentes › Novo cadastro','Cadastrar docente',
    'UC03 — Cadastrar Docente. Ator: Coordenador de Curso. Ator secundário: Departamento de RH.')+
    `<div class="msg msg-erro" id="msg-erro"></div>
     <div class="card"><h3>Dados pessoais</h3>
      <div class="grid g2">
        <div class="campo"><label for="d-nome">Nome completo <span class="obr">*</span></label><input id="d-nome"></div>
        <div class="campo"><label for="d-cpf">CPF <span class="obr">*</span></label><input id="d-cpf" maxlength="11">
          <div class="dica">O sistema verifica a unicidade do CPF (passo 5 do UC03).</div></div>
        <div class="campo"><label for="d-nasc">Data de nascimento <span class="obr">*</span></label><input type="date" id="d-nasc"></div>
        <div class="campo"><label for="d-tel">Telefone <span class="obr">*</span></label><input id="d-tel"></div>
        <div class="campo" style="grid-column:1/-1"><label for="d-end">Endereço <span class="obr">*</span></label><input id="d-end"></div>
        <div class="campo" style="grid-column:1/-1"><label for="d-email">E-mail institucional <span class="obr">*</span></label><input id="d-email"></div>
      </div>
     </div>
     <div class="card"><h3>Formação e vínculo</h3>
      <div class="grid g2">
        <div class="campo"><label for="d-cod">Código de identificação</label><input id="d-cod" value="(gerado automaticamente)" readonly style="background:#f4f6f8">
          <div class="dica">Gerado no passo 6 do UC03.</div></div>
        <div class="campo"><label for="d-tit">Titulação <span class="obr">*</span></label>
          <select id="d-tit">${Object.entries(ROTULO_TITULACAO).map(([cod,rot])=>
            `<option value="${cod}" ${cod==='MESTRADO'?'selected':''}>${rot}</option>`).join('')}</select></div>
        <div class="campo"><label for="d-area">Área de atuação <span class="obr">*</span></label><input id="d-area" placeholder="Ex.: Banco de Dados"></div>
        <div class="campo"><label for="d-regime">Regime de trabalho <span class="obr">*</span></label>
          <select id="d-regime">${BD.regimes.map(r=>`<option value="${r.cod}">${r.desc} — limite de ${r.max}h</option>`).join('')}</select>
          <div class="dica">Define o limite de carga horária validado no UC04.</div></div>
      </div>
      <div class="acoes">
        <button class="btn btn-2" onclick="ir('docente-lista')">Cancelar</button>
        <button class="btn btn-1" onclick="salvarDocente()">Confirmar cadastro</button>
      </div>
     </div>`+
    rodape('Cenário alternativo <b>CA03-A</b>: informe o CPF <code>74652031807</code> (já cadastrado) para ver o bloqueio por duplicidade.');
};
function salvarDocente(){
  const nome=v('d-nome'),cpf=v('d-cpf'),erro=document.getElementById('msg-erro');
  if(!nome||!cpf||!v('d-email')||!v('d-area')){
    erro.className='msg msg-erro ver';
    erro.innerHTML='<strong>Campos obrigatórios não preenchidos</strong>Informe todos os campos marcados com *.'; return;
  }
  if(!validarCPF(cpf)){
    erro.className='msg msg-erro ver';
    erro.innerHTML='<strong>CPF inválido</strong>O número informado não passa na verificação dos dígitos verificadores (módulo 11).';
    return;
  }
  if(BD.pf.some(x=>x.cpf===cpf)){
    const dono=P(BD.pf.find(x=>x.cpf===cpf).id);
    erro.className='msg msg-erro ver';
    erro.innerHTML=`<strong>CA03-A — CPF já cadastrado</strong>O CPF ${fmtCPF(cpf)} já pertence a <b>${dono.nome}</b>. O sistema impede a duplicidade de cadastro.`;
    return;
  }
  const novoId=Math.max(...BD.pessoas.map(p=>p.id))+1;
  const cod='DOC'+String(BD.docentes.length+1).padStart(5,'0');
  BD.pessoas.push({id:novoId,nome,end:v('d-end'),email:v('d-email'),tel:v('d-tel'),tipo:'FISICA',sit:'ATIVO'});
  BD.pf.push({id:novoId,cpf,nasc:v('d-nasc')});
  BD.docentes.push({id:novoId,cod,tit:v('d-tit'),area:v('d-area'),regime:v('d-regime')});
  registrarLog('docente',novoId,'INSERCAO','—','—',cod);
  ir('docente-lista',{msg:`<strong>Cadastro realizado com sucesso</strong>Docente <b>${nome}</b> registrado com situação ATIVO. Código gerado: <b>${cod}</b>.`});
}

/* --------- TELA 08 — ATRIBUIR DISCIPLINA (UC04) --------- */
TELAS['docente-atribuir'] = () => {
  const id = ctx.id || BD.docentes[3].id;
  const d = BD.docentes.find(x=>x.id===id), p=P(id), r=regime(d.regime);
  const c = cargaDocente(id), disp = r.max-c, pct=Math.round(c/r.max*100);
  const minhas = BD.alocacoes.filter(a=>a.doc===id).map(a=>disc(a.disc));
  const livres = BD.disciplinas.filter(dd=>!BD.alocacoes.some(a=>a.disc===dd.id));
  return cab('Gestão de Docentes › Atribuir disciplina','Atribuir disciplina ao docente',
    'UC04 — Atribuir Disciplina ao Docente. Ator: Coordenador de Curso.')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    `<div class="card">
      <div class="barra" style="margin-bottom:0">
        <div class="campo" style="flex:2"><label for="at-doc">Docente</label>
          <select id="at-doc" onchange="ir('docente-atribuir',{id:+this.value})">
            ${BD.docentes.map(x=>`<option value="${x.id}" ${x.id===id?'selected':''}>${x.cod} — ${P(x.id).nome}</option>`).join('')}
          </select></div>
        <div class="campo"><label for="at-per">Período letivo</label><select id="at-per"><option selected>2026/2</option><option>2027/1</option></select></div>
      </div>
     </div>
     <div class="card"><h3>Situação da carga horária</h3>
      <div class="grid g4" style="margin-bottom:14px">
        <div><div class="l" style="font-size:11px;color:var(--texto-fraco)">REGIME</div><b>${r.desc}</b></div>
        <div><div class="l" style="font-size:11px;color:var(--texto-fraco)">CARGA ATUAL</div><b>${c}h</b></div>
        <div><div class="l" style="font-size:11px;color:var(--texto-fraco)">LIMITE DO REGIME</div><b>${r.max}h</b></div>
        <div><div class="l" style="font-size:11px;color:var(--texto-fraco)">DISPONÍVEL</div>
          <b style="color:${disp<=40?'var(--vermelho)':'var(--verde)'}">${disp}h</b></div>
      </div>
      <div class="carga" style="height:14px"><i class="${pct>=90?'alto':pct>=70?'med':''}" style="width:${pct}%"></i></div>
      <div style="font-size:11.5px;color:var(--texto-fraco);margin-top:6px">${p.nome} — ${pct}% da carga horária alocada.</div>
     </div>
     <div class="card"><h3>Disciplinas já atribuídas (${minhas.length})</h3>
      <table><thead><tr><th>Código</th><th>Disciplina</th><th>Carga horária</th><th>Período</th><th></th></tr></thead><tbody>`+
      (minhas.length?minhas.map(m=>`<tr><td><b>${m.cod}</b></td><td>${m.nome}</td><td class="num">${m.ch}h</td><td>${m.per}</td>
        <td><button class="btn-mini perigo" onclick="removerAlocacao(${id},${m.id})">Remover</button></td></tr>`).join('')
      :`<tr><td colspan="5" class="vazio">Nenhuma disciplina atribuída a este docente no período.</td></tr>`)+
      `</tbody></table></div>
     <div class="card"><h3>Disciplinas disponíveis para o período 2026/2</h3>
      <table><thead><tr><th>Código</th><th>Disciplina</th><th>Curso</th><th>Carga horária</th><th></th></tr></thead><tbody>`+
      (livres.length?livres.map(l=>`<tr><td><b>${l.cod}</b></td><td>${l.nome}</td><td>${curso(l.curso)}</td>
        <td class="num">${l.ch}h</td>
        <td><button class="btn-mini" onclick="atribuir(${id},${l.id})">Atribuir</button></td></tr>`).join('')
      :`<tr><td colspan="5" class="vazio">Todas as disciplinas do período já possuem docente responsável.</td></tr>`)+
      `</tbody></table></div>`+
    rodape('Cenário alternativo <b>CA04-A</b>: selecione a docente <b>DOC00004 — Antonella Cassiano</b> (regime horista, 120h de 160h) e tente atribuir uma disciplina de 60h. A regra é aplicada no banco pelo gatilho <code>trg_alocacao_bi</code>.');
};
function atribuir(idDoc,idDisc){
  const d=BD.docentes.find(x=>x.id===idDoc), r=regime(d.regime);
  const c=cargaDocente(idDoc), nova=disc(idDisc);
  if(c+nova.ch > r.max){
    ir('docente-atribuir',{id:idDoc,tipoMsg:'msg-erro',
      msg:`<strong>CA04-A — Carga horária máxima excedida</strong>
        A atribuição de <b>${nova.nome}</b> (${nova.ch}h) ultrapassaria o limite do regime
        <b>${r.desc}</b>. Carga atual: <b>${c}h</b> · Limite: <b>${r.max}h</b> · Disponível: <b>${r.max-c}h</b>.
        Revise a seleção ou não realize a atribuição neste momento.
        <br><code>ERROR 1644 (45000): CA04-A: carga horaria excedida. Atual: ${c}h | Disciplina: ${nova.ch}h | Limite do regime: ${r.max}h.</code>`});
    return;
  }
  BD.alocacoes.push({doc:idDoc,disc:idDisc});
  registrarLog('alocacao_disciplina',idDisc,'INSERCAO','id_docente','—',P(idDoc).nome);
  ir('docente-atribuir',{id:idDoc,
    msg:`<strong>Atribuição registrada</strong>A disciplina <b>${nova.nome}</b> foi vinculada a <b>${P(idDoc).nome}</b> no período 2026/2. Nova carga horária total: <b>${c+nova.ch}h</b> de ${r.max}h.`});
}
function removerAlocacao(idDoc,idDisc){
  const i = BD.alocacoes.findIndex(a=>a.doc===idDoc&&a.disc===idDisc);
  if(i>=0) BD.alocacoes.splice(i,1);
  ir('docente-atribuir',{id:idDoc,tipoMsg:'msg-alerta',
    msg:`<strong>Atribuição removida</strong>As horas foram devolvidas ao saldo do docente. Nova carga: <b>${cargaDocente(idDoc)}h</b>.`});
}

/* --------- TELAS 09/10 — PESSOA FÍSICA --------- */
TELAS['pf-lista'] = () => {
  const busca = (ctx.busca||'').toLowerCase().trim();
  const esp   = ctx.esp||'Todas';
  const espDe = id => BD.alunos.some(a=>a.id===id) ? 'Aluno'
              : BD.docentes.some(d=>d.id===id)     ? 'Docente'
              : 'Sem categoria';
  const ids = BD.pf.map(f=>f.id).filter(id=>{
    const p=P(id), f=PF(id);
    const bate = !busca || p.nome.toLowerCase().includes(busca) || f.cpf.includes(busca.replace(/\D/g,''));
    return bate && (esp==='Todas' || espDe(id)===esp);
  });
  return cab('Pessoas Físicas › Consultar','Consultar pessoas físicas',
    'Todas as pessoas físicas da base, classificadas em Aluno ou Docente. Ator: Assistente Administrativo.')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    `<div class="card">
      <div class="barra">
        <div class="campo" style="flex:2"><label for="f-pf">Nome ou CPF</label>
          <input id="f-pf" value="${ctx.busca||''}" placeholder="Ex.: Sabrina ou 42376509106"></div>
        <div class="campo"><label for="f-esp">Categoria</label>
          <select id="f-esp">${['Todas','Aluno','Docente','Sem categoria'].map(o=>`<option ${o===esp?'selected':''}>${o}</option>`).join('')}</select></div>
        <button class="btn btn-1" onclick="ir('pf-lista',{busca:document.getElementById('f-pf').value,esp:document.getElementById('f-esp').value})">Pesquisar</button>
        <button class="btn btn-2" onclick="ir('pf-lista')">Limpar</button>
        <button class="btn btn-ok" onclick="ir('pf-form')">+ Nova pessoa física</button>
      </div>
      <table><thead><tr><th>CPF</th><th>Nome</th><th>Nascimento</th><th>E-mail</th><th>Telefone</th><th>Categoria</th><th>Situação</th><th></th></tr></thead><tbody>`+
      (ids.length?ids.map(id=>{
        const p=P(id), f=PF(id);
        const rotulo = espDe(id);
        const marca = rotulo==='Aluno'?'<span class="tag t-info">Aluno</span>'
                    : rotulo==='Docente'?'<span class="tag t-ativo">Docente</span>'
                    : '<span class="tag t-inativo">—</span>';
        return `<tr><td>${fmtCPF(f.cpf)}</td><td>${p.nome}</td><td>${dataBR(f.nasc)}</td><td>${p.email}</td>
          <td>${p.tel}</td><td>${marca}</td><td>${tagSit(p.sit)}</td>
          <td style="white-space:nowrap"><button class="btn-mini" onclick="ir('pf-form',{id:${id}})">Editar</button>
          ${p.sit==='ATIVO'?`<button class="btn-mini perigo" onclick="inativarPessoa(${id},'pf-lista')">Inativar</button>`
            :`<button class="btn-mini ok" onclick="reativarPessoa(${id},'pf-lista')">Reativar</button>`}</td></tr>`;
      }).join('')
      :`<tr><td colspan="8" class="vazio">Nenhuma pessoa física encontrada com os critérios informados.</td></tr>`)+
      `</tbody></table></div>`+
    rodape('A coluna <b>Categoria</b> mostra a herança do diagrama de classes: <code>pessoa_fisica</code> é a superclasse de <code>aluno</code> e <code>docente</code>, e o CPF é único entre as duas.');
};
TELAS['pf-form'] = () => {
  const ed=!!ctx.id, p=ed?P(ctx.id):{nome:'',end:'',email:'',tel:''}, f=ed?PF(ctx.id):{cpf:'',nasc:''};
  return cab('Pessoas Físicas › '+(ed?'Atualizar':'Nova'),(ed?'Atualizar':'Cadastrar')+' pessoa física',
    'Casos de uso Cadastrar/Atualizar Pessoa Física. Ator: Assistente Administrativo.')+
    `<div class="msg msg-erro" id="msg-erro"></div>
     <div class="card"><h3>Identificação</h3>
      <div class="grid g2">
        <div class="campo"><label for="x-nome">Nome completo <span class="obr">*</span></label><input id="x-nome" value="${p.nome}"></div>
        <div class="campo"><label for="x-cpf">CPF <span class="obr">*</span></label><input id="x-cpf" maxlength="11" value="${f.cpf}" ${ed?'readonly style="background:#f4f6f8"':''}></div>
        <div class="campo"><label for="x-nasc">Data de nascimento <span class="obr">*</span></label><input type="date" id="x-nasc" value="${f.nasc}"></div>
        <div class="campo"><label for="x-tel">Telefone <span class="obr">*</span></label><input id="x-tel" value="${p.tel}"></div>
        <div class="campo" style="grid-column:1/-1"><label for="x-end">Endereço <span class="obr">*</span></label><input id="x-end" value="${p.end}"></div>
        <div class="campo" style="grid-column:1/-1"><label for="x-email">E-mail <span class="obr">*</span></label><input id="x-email" value="${p.email}"></div>
      </div>
      <div class="acoes"><button class="btn btn-2" onclick="ir('pf-lista')">Cancelar</button>
        <button class="btn btn-1" onclick="salvarPF(${ed?ctx.id:'null'})">${ed?'Salvar alterações':'Confirmar cadastro'}</button></div>
     </div>`+
    rodape('Tabelas envolvidas: <code>pessoa</code> (dados comuns) e <code>pessoa_fisica</code> (CPF e data de nascimento), unidas por chave primária compartilhada.');
};
function salvarPF(id){
  const nome=v('x-nome'),cpf=v('x-cpf'),erro=document.getElementById('msg-erro');
  if(!nome||!cpf){erro.className='msg msg-erro ver';erro.innerHTML='<strong>Campos obrigatórios não preenchidos</strong>Informe nome e CPF.';return;}
  if(!id && !validarCPF(cpf)){
    erro.className='msg msg-erro ver';
    erro.innerHTML='<strong>CPF inválido</strong>O número informado não passa na verificação dos dígitos verificadores (módulo 11).';return;
  }
  if(!id && BD.pf.some(x=>x.cpf===cpf)){
    erro.className='msg msg-erro ver';
    erro.innerHTML=`<strong>CPF já cadastrado</strong>O CPF ${fmtCPF(cpf)} já existe na base de dados.`;return;
  }
  if(id){
    const p=P(id);
    if(p.end!==v('x-end')) registrarLog('pessoa',id,'ATUALIZACAO','endereco',p.end,v('x-end'));
    p.nome=nome;p.end=v('x-end');p.email=v('x-email');p.tel=v('x-tel');
    PF(id).nasc=v('x-nasc');
    ir('pf-lista',{msg:`<strong>Atualização concluída</strong>Os dados de <b>${nome}</b> foram atualizados.`});
  }else{
    const novo=Math.max(...BD.pessoas.map(p=>p.id))+1;
    BD.pessoas.push({id:novo,nome,end:v('x-end'),email:v('x-email'),tel:v('x-tel'),tipo:'FISICA',sit:'ATIVO'});
    BD.pf.push({id:novo,cpf,nasc:v('x-nasc')});
    registrarLog('pessoa_fisica',novo,'INSERCAO','—','—',cpf);
    ir('pf-lista',{msg:`<strong>Cadastro realizado</strong>Pessoa física <b>${nome}</b> registrada com situação ATIVO.`});
  }
}

/* --------- TELAS 11/12 — PESSOA JURÍDICA --------- */
TELAS['pj-lista'] = () => {
  const busca = (ctx.busca||'').toLowerCase().trim();
  const esp   = ctx.esp||'Todas';
  const eForn = id => BD.fornecedores.some(f=>f.id===id);
  const linhas = BD.pj.filter(j=>{
    const p=P(j.id);
    const bate = !busca || j.razao.toLowerCase().includes(busca) || p.nome.toLowerCase().includes(busca)
              || j.cnpj.includes(busca.replace(/\D/g,''));
    const rotulo = eForn(j.id) ? 'Fornecedor' : 'Sem categoria';
    return bate && (esp==='Todas' || rotulo===esp);
  });
  return cab('Pessoas Jurídicas › Consultar','Consultar pessoas jurídicas',
    'Todas as pessoas jurídicas da base. Nesta carga as duas são fornecedores. Ator: Assistente Administrativo.')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    `<div class="card">
      <div class="barra">
        <div class="campo" style="flex:2"><label for="f-pj">Razão social ou CNPJ</label>
          <input id="f-pj" value="${ctx.busca||''}" placeholder="Ex.: TecnoInfo ou 80459276000171"></div>
        <div class="campo"><label for="f-pjesp">Categoria</label>
          <select id="f-pjesp">${['Todas','Fornecedor','Sem categoria'].map(o=>`<option ${o===esp?'selected':''}>${o}</option>`).join('')}</select></div>
        <button class="btn btn-1" onclick="ir('pj-lista',{busca:document.getElementById('f-pj').value,esp:document.getElementById('f-pjesp').value})">Pesquisar</button>
        <button class="btn btn-2" onclick="ir('pj-lista')">Limpar</button>
        <button class="btn btn-ok" onclick="ir('pj-form')">+ Nova pessoa jurídica</button>
      </div>
      <table><thead><tr><th>CNPJ</th><th>Razão social</th><th>Nome fantasia</th><th>E-mail</th><th>Categoria</th><th>Situação</th><th></th></tr></thead><tbody>`+
      (linhas.length?linhas.map(j=>{const p=P(j.id);
        const marca = eForn(j.id)?'<span class="tag t-erro">Fornecedor</span>':'<span class="tag t-inativo">—</span>';
        return `<tr><td>${fmtCNPJ(j.cnpj)}</td><td>${j.razao}</td><td>${p.nome}</td><td>${p.email}</td>
          <td>${marca}</td><td>${tagSit(p.sit)}</td>
          <td style="white-space:nowrap"><button class="btn-mini" onclick="ir('pj-form',{id:${j.id}})">Editar</button>
          ${p.sit==='ATIVO'?`<button class="btn-mini perigo" onclick="inativarPessoa(${j.id},'pj-lista')">Inativar</button>`
            :`<button class="btn-mini ok" onclick="reativarPessoa(${j.id},'pj-lista')">Reativar</button>`}</td></tr>`;
      }).join('')
      :`<tr><td colspan="7" class="vazio">Nenhuma pessoa jurídica encontrada com os critérios informados.</td></tr>`)+
      `</tbody></table></div>`+
    rodape('Tabelas: <code>pessoa</code> + <code>pessoa_juridica</code>. A categoria <b>Fornecedor</b> acrescenta limite de gastos e requisitos de fornecimento.');
};
TELAS['pj-form'] = () => {
  const ed=!!ctx.id, p=ed?P(ctx.id):{nome:'',end:'',email:'',tel:''}, j=ed?PJ(ctx.id):{cnpj:'',razao:''};
  return cab('Pessoas Jurídicas › '+(ed?'Atualizar':'Nova'),(ed?'Atualizar':'Cadastrar')+' pessoa jurídica',
    'Casos de uso Cadastrar/Atualizar Pessoa Jurídica. Ator: Assistente Administrativo.')+
    `<div class="msg msg-erro" id="msg-erro"></div>
     <div class="card"><h3>Identificação</h3>
      <div class="grid g2">
        <div class="campo"><label for="j-cnpj">CNPJ <span class="obr">*</span></label><input id="j-cnpj" maxlength="14" value="${j.cnpj}" ${ed?'readonly style="background:#f4f6f8"':''}>
          <div class="dica">14 dígitos numéricos, sem pontuação.</div></div>
        <div class="campo"><label for="j-razao">Razão social <span class="obr">*</span></label><input id="j-razao" value="${j.razao}"></div>
        <div class="campo"><label for="j-nome">Nome fantasia <span class="obr">*</span></label><input id="j-nome" value="${p.nome}"></div>
        <div class="campo"><label for="j-tel">Telefone <span class="obr">*</span></label><input id="j-tel" value="${p.tel}"></div>
        <div class="campo" style="grid-column:1/-1"><label for="j-end">Endereço <span class="obr">*</span></label><input id="j-end" value="${p.end}"></div>
        <div class="campo" style="grid-column:1/-1"><label for="j-email">E-mail <span class="obr">*</span></label><input id="j-email" value="${p.email}"></div>
      </div>
      <div class="acoes"><button class="btn btn-2" onclick="ir('pj-lista')">Cancelar</button>
        <button class="btn btn-1" onclick="salvarPJ(${ed?ctx.id:'null'})">${ed?'Salvar alterações':'Confirmar cadastro'}</button></div>
     </div>`+
    rodape('Informe um CNPJ com menos de 14 dígitos para ver a validação de formato, equivalente à restrição <code>ck_pj_cnpj_formato</code> do banco.');
};
function salvarPJ(id){
  const cnpj=v('j-cnpj'),razao=v('j-razao'),nome=v('j-nome'),erro=document.getElementById('msg-erro');
  if(!id && !validarCNPJ(cnpj)){
    erro.className='msg msg-erro ver';
    erro.innerHTML=`<strong>CNPJ inválido</strong>O CNPJ deve conter 14 dígitos numéricos e passar na verificação
      dos dígitos verificadores (módulo 11).
      <br><code>ERROR 3819 (HY000): Check constraint 'ck_pj_cnpj_formato' is violated.</code>`;return;
  }
  if(!razao||!nome){erro.className='msg msg-erro ver';erro.innerHTML='<strong>Campos obrigatórios não preenchidos</strong>Informe a razão social e o nome fantasia.';return;}
  if(!id && BD.pj.some(x=>x.cnpj===cnpj)){
    erro.className='msg msg-erro ver';erro.innerHTML=`<strong>CNPJ já cadastrado</strong>Já existe pessoa jurídica com o CNPJ ${fmtCNPJ(cnpj)}.`;return;
  }
  if(id){
    const p=P(id);p.nome=nome;p.end=v('j-end');p.email=v('j-email');p.tel=v('j-tel');PJ(id).razao=razao;
    registrarLog('pessoa',id,'ATUALIZACAO','razao_social','—',razao);
    ir('pj-lista',{msg:`<strong>Atualização concluída</strong>Os dados de <b>${razao}</b> foram atualizados.`});
  }else{
    const novo=Math.max(...BD.pessoas.map(p=>p.id))+1;
    BD.pessoas.push({id:novo,nome,end:v('j-end'),email:v('j-email'),tel:v('j-tel'),tipo:'JURIDICA',sit:'ATIVO'});
    BD.pj.push({id:novo,cnpj,razao});
    registrarLog('pessoa_juridica',novo,'INSERCAO','—','—',cnpj);
    ir('pj-lista',{msg:`<strong>Cadastro realizado</strong>Pessoa jurídica <b>${razao}</b> registrada com situação ATIVO.`});
  }
}

/* --------- TELAS 13/14 — FORNECEDORES --------- */
TELAS['forn-lista'] = () => {
  const busca = (ctx.busca||'').toLowerCase().trim();
  const cat   = ctx.cat||'Todas';
  const linhas = BD.fornecedores.filter(f=>{
    const p=P(f.id), j=PJ(f.id);
    const bate = !busca || p.nome.toLowerCase().includes(busca) || j.razao.toLowerCase().includes(busca)
              || j.cnpj.includes(busca.replace(/\D/g,''));
    return bate && (cat==='Todas' || f.cat===cat);
  });
  return cab('Fornecedores › Consultar','Consultar fornecedores',
    'Fornecedores homologados, com limite de gastos e total já empenhado em pedidos. Ator: Assistente Administrativo.')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    `<div class="card">
      <div class="barra">
        <div class="campo" style="flex:2"><label for="f-forn">Nome fantasia ou CNPJ</label>
          <input id="f-forn" value="${ctx.busca||''}" placeholder="Ex.: TecnoInfo"></div>
        <div class="campo"><label for="f-cat">Categoria</label>
          <select id="f-cat"><option>Todas</option>${[...new Set(BD.fornecedores.map(f=>f.cat))].map(c=>`<option ${c===cat?'selected':''}>${c}</option>`).join('')}</select></div>
        <button class="btn btn-1" onclick="ir('forn-lista',{busca:document.getElementById('f-forn').value,cat:document.getElementById('f-cat').value})">Pesquisar</button>
        <button class="btn btn-2" onclick="ir('forn-lista')">Limpar</button>
        <button class="btn btn-ok" onclick="ir('forn-form')">+ Novo fornecedor</button>
      </div>
      <table><thead><tr><th>CNPJ</th><th>Fornecedor</th><th>Categoria</th><th>Limite de gastos</th>
        <th>Empenhado</th><th>Homologação</th><th>Situação</th><th></th></tr></thead><tbody>`+
      (linhas.length?linhas.map(f=>{
        const p=P(f.id), j=PJ(f.id);
        const emp = BD.pedidos.filter(x=>x.forn===f.id).reduce((s,x)=>s+totalPedido(x),0);
        const pct = Math.round(emp/f.limite*100);
        return `<tr><td>${fmtCNPJ(j.cnpj)}</td><td><b>${p.nome}</b><div style="font-size:11px;color:var(--texto-fraco)">${j.razao}</div></td>
          <td>${f.cat}</td><td class="num">${moeda(f.limite)}</td>
          <td class="num">${moeda(emp)} <span class="tag ${pct>=90?'t-erro':pct>=70?'t-alerta':'t-info'}">${pct}%</span></td>
          <td>${dataBR(f.homolog)}</td><td>${tagSit(p.sit)}</td>
          <td style="white-space:nowrap"><button class="btn-mini" onclick="ir('forn-form',{id:${f.id}})">Editar</button>
          ${p.sit==='ATIVO'?`<button class="btn-mini perigo" onclick="inativarPessoa(${f.id},'forn-lista')">Inativar</button>`
            :`<button class="btn-mini ok" onclick="reativarPessoa(${f.id},'forn-lista')">Reativar</button>`}</td></tr>`;
      }).join('')
      :`<tr><td colspan="8" class="vazio">Nenhum fornecedor encontrado com os critérios informados.</td></tr>`)+
      `</tbody></table></div>`+
    rodape('Casos de uso: <b>Consultar Fornecedor</b> e <b>Inativar Fornecedor</b>. Consulta SQL: <code>SELECT ... FROM vw_fornecedor</code> com <code>LEFT JOIN pedido</code>.');
};
TELAS['forn-form'] = () => {
  const ed=!!ctx.id, f=ed?BD.fornecedores.find(x=>x.id===ctx.id):{limite:'',req:'',cat:'',homolog:''};
  const p=ed?P(ctx.id):{nome:'',end:'',email:'',tel:''}, j=ed?PJ(ctx.id):{cnpj:'',razao:''};
  return cab('Fornecedores › '+(ed?'Atualizar':'Novo'),(ed?'Atualizar':'Cadastrar')+' fornecedor',
    'Casos de uso Cadastrar/Atualizar Fornecedor. O fornecedor é uma Pessoa Jurídica com dados de fornecimento.')+
    `<div class="msg msg-erro" id="msg-erro"></div>
     <div class="card"><h3>Dados da pessoa jurídica</h3>
      <div class="grid g2">
        <div class="campo"><label for="k-cnpj">CNPJ <span class="obr">*</span></label><input id="k-cnpj" maxlength="14" value="${j.cnpj}" ${ed?'readonly style="background:#f4f6f8"':''}></div>
        <div class="campo"><label for="k-razao">Razão social <span class="obr">*</span></label><input id="k-razao" value="${j.razao}"></div>
        <div class="campo"><label for="k-nome">Nome fantasia <span class="obr">*</span></label><input id="k-nome" value="${p.nome}"></div>
        <div class="campo"><label for="k-tel">Telefone <span class="obr">*</span></label><input id="k-tel" value="${p.tel}"></div>
        <div class="campo" style="grid-column:1/-1"><label for="k-email">E-mail comercial <span class="obr">*</span></label><input id="k-email" value="${p.email}"></div>
      </div>
     </div>
     <div class="card"><h3>Dados de fornecimento</h3>
      <div class="grid g3">
        <div class="campo"><label for="k-cat">Categoria <span class="obr">*</span></label><input id="k-cat" value="${f.cat}" placeholder="Ex.: Informática"></div>
        <div class="campo"><label for="k-limite">Limite de gastos (R$) <span class="obr">*</span></label><input id="k-limite" type="number" step="0.01" value="${f.limite}">
          <div class="dica">Valor máximo autorizado por período.</div></div>
        <div class="campo"><label for="k-homolog">Data de homologação</label><input type="date" id="k-homolog" value="${f.homolog}"></div>
      </div>
      <div class="campo" style="margin-top:14px"><label for="k-req">Requisitos de fornecimento <span class="obr">*</span></label>
        <textarea id="k-req" rows="3">${f.req}</textarea>
        <div class="dica">Condições que o fornecedor se compromete a cumprir (prazo, garantia, certificações).</div></div>
      <div class="acoes"><button class="btn btn-2" onclick="ir('forn-lista')">Cancelar</button>
        <button class="btn btn-1" onclick="salvarForn(${ed?ctx.id:'null'})">${ed?'Salvar alterações':'Confirmar cadastro'}</button></div>
     </div>`+
    rodape('A gravação percorre três tabelas — <code>pessoa</code>, <code>pessoa_juridica</code> e <code>fornecedor</code> — refletindo a herança do diagrama de classes.');
};
function salvarForn(id){
  const cnpj=v('k-cnpj'),nome=v('k-nome'),erro=document.getElementById('msg-erro');
  if(!id && !validarCNPJ(cnpj)){
    erro.className='msg msg-erro ver';
    erro.innerHTML=`<strong>CNPJ inválido</strong>O CNPJ deve conter 14 dígitos numéricos e passar na verificação dos dígitos verificadores (módulo 11).`;return;
  }
  if(!nome||!v('k-limite')||!v('k-req')){
    erro.className='msg msg-erro ver';erro.innerHTML='<strong>Campos obrigatórios não preenchidos</strong>Informe nome fantasia, limite de gastos e requisitos.';return;
  }
  if(id){
    const f=BD.fornecedores.find(x=>x.id===id), p=P(id);
    f.limite=+v('k-limite');f.req=v('k-req');f.cat=v('k-cat');f.homolog=v('k-homolog');
    p.nome=nome;p.email=v('k-email');p.tel=v('k-tel');PJ(id).razao=v('k-razao');
    registrarLog('fornecedor',id,'ATUALIZACAO','limite_gastos','—',v('k-limite'));
    ir('forn-lista',{msg:`<strong>Atualização concluída</strong>Os dados do fornecedor <b>${nome}</b> foram atualizados.`});
  }else{
    const novo=Math.max(...BD.pessoas.map(p=>p.id))+1;
    BD.pessoas.push({id:novo,nome,end:'',email:v('k-email'),tel:v('k-tel'),tipo:'JURIDICA',sit:'ATIVO'});
    BD.pj.push({id:novo,cnpj,razao:v('k-razao')});
    BD.fornecedores.push({id:novo,limite:+v('k-limite'),req:v('k-req'),cat:v('k-cat'),homolog:v('k-homolog')});
    registrarLog('fornecedor',novo,'INSERCAO','—','—',cnpj);
    ir('forn-lista',{msg:`<strong>Cadastro realizado</strong>Fornecedor <b>${nome}</b> registrado com situação ATIVO.`});
  }
}

/* --------- TELA 15 — REQUISITOS DE FORNECIMENTO --------- */
TELAS['req-lista'] = () => {
  return cab('Processo de Fornecimento › Requisitos','Estabelecer requisitos de fornecimento',
    'Caso de uso Estabelecer Requisitos de Fornecimento. Ator: Gestor de Projeto (responsável gestor do projeto).')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    fluxo(0)+
    `<div class="card"><h3>Novo requisito</h3>
      <div class="msg msg-erro" id="msg-erro"></div>
      <div class="grid g2">
        <div class="campo" style="grid-column:1/-1"><label for="r-desc">Descrição do requisito <span class="obr">*</span></label>
          <input id="r-desc" placeholder="Ex.: Aquisição de 20 monitores para o laboratório 3."></div>
        <div class="campo"><label for="r-cat">Categoria <span class="obr">*</span></label><input id="r-cat" placeholder="Ex.: Informática"></div>
        <div class="campo"><label for="r-prazo">Prazo máximo (dias) <span class="obr">*</span></label><input id="r-prazo" type="number" value="30"></div>
        <div class="campo"><label for="r-valor">Valor estimado (R$) <span class="obr">*</span></label><input id="r-valor" type="number" step="0.01" placeholder="0,00"></div>
        <div class="campo"><label for="r-sit">Situação inicial</label><input id="r-sit" value="ABERTO" readonly style="background:#f4f6f8"></div>
      </div>
      <div class="acoes"><button class="btn btn-2">Limpar</button><button class="btn btn-1" onclick="salvarReq()">Registrar requisito</button></div>
     </div>
     <div class="card"><h3>Requisitos registrados</h3>
      <table><thead><tr><th>#</th><th>Descrição</th><th>Categoria</th><th>Prazo</th><th>Valor estimado</th><th>Situação</th><th></th></tr></thead><tbody>`+
      BD.requisitos.map(r=>`<tr><td><b>${String(r.id).padStart(3,'0')}</b></td><td>${r.desc}</td><td>${r.cat}</td>
        <td class="num">${r.prazo} dias</td><td class="num">${moeda(r.valor)}</td>
        <td><span class="tag ${r.sit==='ABERTO'?'t-info':r.sit==='EM_COTACAO'?'t-alerta':'t-inativo'}">${ROTULO_SIT_REQUISITO[r.sit]||r.sit}</span></td>
        <td><button class="btn-mini" onclick="ir('forn-busca',{req:${r.id}})">Procurar fornecedores</button></td></tr>`).join('')+
      `</tbody></table></div>`+
    rodape('Pré-condição: o gestor deve estar autenticado e ter acesso ao módulo de fornecimento. Pós-condição: os requisitos são registrados no sistema (tabela <code>requisito_fornecimento</code>).');
};
function fluxo(etapa){
  const et=['1. Requisitos','2. Procura de fornecedores','3. Contato e pedido','4. Apresentação','5. Validação'];
  return `<div class="fluxo">`+et.map((e,i)=>
    `<div class="et ${i===etapa?'on':i<etapa?'ok':''}">${e}</div>`).join('')+`</div>`;
}
function salvarReq(){
  const desc=v('r-desc'),valor=+v('r-valor'),erro=document.getElementById('msg-erro');
  if(!desc||!v('r-cat')||!valor){
    erro.className='msg msg-erro ver';
    erro.innerHTML='<strong>Erro no registro do requisito</strong>Descrição, categoria e valor estimado são obrigatórios. O sistema exibe mensagem de erro e solicita a correção dos dados informados.';return;
  }
  const id=Math.max(...BD.requisitos.map(r=>r.id))+1;
  BD.requisitos.push({id,desc,cat:v('r-cat'),prazo:+v('r-prazo'),valor,sit:'ABERTO'});
  ir('req-lista',{msg:`<strong>Requisito registrado</strong>O requisito <b>${String(id).padStart(3,'0')}</b> foi gravado com situação ABERTO e já pode ser usado na procura de fornecedores.`});
}

/* --------- TELA 16 — PROCURAR FORNECEDORES --------- */
TELAS['forn-busca'] = () => {
  const req = ctx.req ? BD.requisitos.find(r=>r.id===ctx.req) : null;
  const candidatos = req ? BD.fornecedores.filter(f=>f.cat===req.cat && P(f.id).sit==='ATIVO') : [];
  return cab('Processo de Fornecimento › Procura','Procurar fornecedores',
    'Casos de uso Procura de Fornecedores e Procura de Fornecedores (CNPJ). Ator: Gestor de Projeto.')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    fluxo(1)+
    `<div class="card"><h3>Busca por requisito pré-estabelecido</h3>
      <div class="barra" style="margin-bottom:0">
        <div class="campo" style="flex:3"><label for="b-req">Requisito de fornecimento</label>
          <select id="b-req" onchange="ir('forn-busca',{req:+this.value})">
            <option value="">— selecione —</option>
            ${BD.requisitos.map(r=>`<option value="${r.id}" ${req&&r.id===req.id?'selected':''}>${String(r.id).padStart(3,'0')} — ${r.desc}</option>`).join('')}
          </select></div>
      </div>
     </div>`+
    (req?`<div class="card"><h3>Fornecedores candidatos para a categoria "${req.cat}" (${candidatos.length})</h3>`+
      (candidatos.length?
      `<table><thead><tr><th>CNPJ</th><th>Fornecedor</th><th>Limite de gastos</th><th>Requisitos atendidos</th><th></th></tr></thead><tbody>`+
      candidatos.map(f=>`<tr><td>${fmtCNPJ(PJ(f.id).cnpj)}</td><td><b>${P(f.id).nome}</b></td>
        <td class="num">${moeda(f.limite)} ${f.limite>=req.valor?'<span class="tag t-ativo">Comporta</span>':'<span class="tag t-erro">Insuficiente</span>'}</td>
        <td style="font-size:12px">${f.req}</td>
        <td><button class="btn-mini" onclick="novoPedido(${req.id},${f.id})">Entrar em contato</button></td></tr>`).join('')+
      `</tbody></table>`
      :`<div class="msg msg-alerta ver"><strong>Nenhum fornecedor candidato</strong>
        O sistema registra o erro e notifica o gestor para revisão dos critérios do requisito.</div>`)+
     `</div>`:'')+
    `<div class="card"><h3>Busca direta por CNPJ</h3>
      <div class="msg msg-erro" id="msg-cnpj"></div>
      <div class="barra" style="margin-bottom:0">
        <div class="campo" style="flex:2"><label for="b-cnpj">CNPJ do fornecedor</label>
          <input id="b-cnpj" maxlength="14" placeholder="80459276000171">
          <div class="dica">Informe os 14 dígitos, sem pontuação. Um CNPJ em formato inválido é rejeitado.</div></div>
        <button class="btn btn-1" onclick="buscarCNPJ()">Consultar</button>
      </div>
      <div id="res-cnpj"></div>
     </div>`+
    rodape('Cenário de erro <b>Procura de Fornecedores (CNPJ — Erros)</b>: informe um CNPJ incompleto (ex.: <code>1234</code>) ou inexistente para ver as mensagens de validação.');
};
function buscarCNPJ(){
  const c=v('b-cnpj'), erro=document.getElementById('msg-cnpj'), res=document.getElementById('res-cnpj');
  res.innerHTML='';
  if(!validarCNPJ(c)){
    erro.className='msg msg-erro ver';
    erro.innerHTML='<strong>CNPJ inválido</strong>O CNPJ informado está em formato inválido ou não passa na verificação '+
      'dos dígitos verificadores. Solicita-se nova entrada.';return;
  }
  const j=BD.pj.find(x=>x.cnpj===c);
  if(!j){
    erro.className='msg msg-erro ver';
    erro.innerHTML='<strong>CNPJ inexistente</strong>Nenhuma pessoa jurídica foi localizada com o CNPJ informado. Solicita-se nova entrada.';return;
  }
  erro.className='msg msg-erro';
  const f=BD.fornecedores.find(x=>x.id===j.id), p=P(j.id);
  res.innerHTML=`<div class="msg msg-ok ver" style="margin-top:14px"><strong>Fornecedor localizado</strong>As informações do fornecedor são exibidas ao gestor.</div>
    <table style="margin-top:6px"><tbody>
      <tr><th style="width:200px">Razão social</th><td>${j.razao}</td></tr>
      <tr><th>Nome fantasia</th><td>${p.nome}</td></tr>
      <tr><th>CNPJ</th><td>${fmtCNPJ(j.cnpj)}</td></tr>
      <tr><th>Situação</th><td>${tagSit(p.sit)}</td></tr>
      <tr><th>Categoria</th><td>${f?f.cat:'— não é fornecedor homologado —'}</td></tr>
      <tr><th>Limite de gastos</th><td>${f?moeda(f.limite):'—'}</td></tr>
      <tr><th>Requisitos de fornecimento</th><td>${f?f.req:'—'}</td></tr>
      <tr><th>Contato</th><td>${p.email} · ${p.tel}</td></tr>
    </tbody></table>`;
}

/* --------- TELAS 17/18 — PEDIDOS --------- */
function pedidosFiltrados(){
  const busca  = (ctx.busca||'').toLowerCase().trim();
  const status = ctx.status||'Todas';
  return BD.pedidos.filter(p=>{
    const bate = !busca || p.num.toLowerCase().includes(busca) || P(p.forn).nome.toLowerCase().includes(busca);
    return bate && (status==='Todas' || p.status===status);
  });
}
TELAS['pedido-lista'] = () => {
  return cab('Processo de Fornecimento › Pedidos','Pedidos de fornecimento',
    'Casos de uso Contato com Fornecedores e Realização do Pedido e Apresentação do Pedido. Ator: Gestor de Projeto.')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    fluxo(2)+
    `<div class="card">
      <div class="barra">
        <div class="campo" style="flex:2"><label for="f-ped">Número do pedido ou fornecedor</label>
          <input id="f-ped" value="${ctx.busca||''}" placeholder="PED-2026001"></div>
        <div class="campo"><label for="f-status">Situação</label>
          <select id="f-status">${['Todas','RASCUNHO','ENVIADO','APRESENTADO','APROVADO','REPROVADO','CANCELADO']
            .map(o=>`<option ${o===(ctx.status||'Todas')?'selected':''}>${o}</option>`).join('')}</select></div>
        <button class="btn btn-1" onclick="ir('pedido-lista',{busca:document.getElementById('f-ped').value,status:document.getElementById('f-status').value})">Pesquisar</button>
        <button class="btn btn-2" onclick="ir('pedido-lista')">Limpar</button>
        <button class="btn btn-ok" onclick="novoPedido()">+ Novo pedido</button>
      </div>
      <table><thead><tr><th>Número</th><th>Fornecedor</th><th>Requisito</th><th>Itens</th><th>Valor total</th>
        <th>Limite do fornecedor</th><th>Situação</th><th></th></tr></thead><tbody>`+
      (pedidosFiltrados().length?pedidosFiltrados().map(p=>{
        const f=BD.fornecedores.find(x=>x.id===p.forn), r=BD.requisitos.find(x=>x.id===p.req), t=totalPedido(p);
        const cor = p.status==='APROVADO'?'t-ativo':p.status==='REPROVADO'?'t-erro':p.status==='RASCUNHO'?'t-inativo':'t-alerta';
        return `<tr><td><b>${p.num}</b><div style="font-size:11px;color:var(--texto-fraco)">${dataBR(p.data)}</div></td>
          <td>${P(p.forn).nome}</td><td style="font-size:12px">${r.desc}</td>
          <td class="num">${p.itens.length}</td><td class="num"><b>${moeda(t)}</b></td>
          <td class="num">${moeda(f.limite)} ${t>f.limite?'<span class="tag t-erro">excede</span>':''}</td>
          <td><span class="tag ${cor}">${p.status}</span></td>
          <td style="white-space:nowrap">
            <button class="btn-mini" onclick="ir('pedido-form',{id:${p.id}})">Detalhar</button>
            ${p.status==='RASCUNHO'?`<button class="btn-mini" onclick="apresentar(${p.id})">Apresentar</button>`:''}
          </td></tr>`;
      }).join('')
      :`<tr><td colspan="8" class="vazio">Nenhum pedido encontrado com os critérios informados.</td></tr>`)+
      `</tbody></table></div>`+
    rodape('Pós-condição: o pedido é formalizado e encaminhado ao fornecedor para avaliação. Tabelas: <code>pedido</code>, <code>item_pedido</code> (com <code>subtotal</code> como coluna gerada).');
};
function apresentar(id){
  const p=BD.pedidos.find(x=>x.id===id);
  p.status='APRESENTADO';
  ir('pedido-lista',{msg:`<strong>Pedido apresentado</strong>O pedido <b>${p.num}</b> foi apresentado e encaminhado para validação.`});
}
/* Guarda o pedido que está sendo montado. Só entra na base quando o
   gestor clica em formalizar. */
let rascunho = null;
function novoPedido(idReq, idForn){
  rascunho = { req: idReq||BD.requisitos[0].id, forn: idForn||BD.fornecedores[0].id, itens: [] };
  ir('pedido-form');
}
function itensEmEdicao(){
  return ctx.id ? BD.pedidos.find(x=>x.id===ctx.id).itens : rascunho.itens;
}
function adicionarItem(){
  const d = v('it-desc').trim(), q = Number(v('it-qtd')), val = Number(v('it-valor'));
  const erro = document.getElementById('msg-item');
  if(!d || !(q>0) || !(val>0)){
    erro.className = 'msg msg-erro ver';
    erro.innerHTML = '<strong>Item inválido</strong>Informe a descrição, uma quantidade maior que zero e um valor unitário maior que zero.';
    return;
  }
  itensEmEdicao().push({ d, q, v: val });
  ir('pedido-form', ctx);
}
function removerItem(indice){
  itensEmEdicao().splice(indice, 1);
  ir('pedido-form', ctx);
}
function formalizarPedido(){
  if(!rascunho.itens.length){
    const erro = document.getElementById('msg-item');
    erro.className = 'msg msg-erro ver';
    erro.innerHTML = '<strong>Pedido sem itens</strong>Lance ao menos um item antes de formalizar o pedido.';
    return;
  }
  const id  = Math.max(...BD.pedidos.map(x=>x.id)) + 1;
  const num = 'PED-2026' + String(id).padStart(3,'0');
  BD.pedidos.push({ id, num, req: rascunho.req, forn: rascunho.forn,
                    data: new Date().toISOString().slice(0,10),
                    status:'RASCUNHO', itens: rascunho.itens, val: null });
  registrarLog('pedido', id, 'INSERCAO', '—', '—', num);
  const criado = rascunho; rascunho = null;
  ir('pedido-lista',{msg:`<strong>Pedido formalizado</strong>O pedido <b>${num}</b> foi registrado com ${criado.itens.length} item(ns) `+
    `e encaminhado ao fornecedor para avaliação.`});
}

TELAS['pedido-form'] = () => {
  const ed = !!ctx.id;
  const p = ed ? BD.pedidos.find(x=>x.id===ctx.id) : null;
  if(!ed && !rascunho) rascunho = { req: ctx.req||BD.requisitos[0].id, forn: ctx.forn||BD.fornecedores[0].id, itens: [] };
  const idReq = p ? p.req : rascunho.req, idForn = p ? p.forn : rascunho.forn;
  const f = BD.fornecedores.find(x=>x.id===idForn), r = BD.requisitos.find(x=>x.id===idReq);
  const itens = p ? p.itens : rascunho.itens;
  const total = itens.reduce((s,i)=>s+i.q*i.v, 0);
  const editavel = !ed || p.status==='RASCUNHO';
  return cab('Processo de Fornecimento › '+(ed?'Detalhe do pedido':'Novo pedido'),
    ed?`Pedido ${p.num}`:'Realizar pedido para avaliação',
    'Caso de uso Contato com Fornecedores e Realização do Pedido. Pré-condição: o fornecedor deve estar identificado e aprovado na etapa anterior.')+
    fluxo(2)+
    `<div class="card"><h3>Identificação do pedido</h3>
      <div class="grid g3">
        <div class="campo"><label for="pd-num">Número</label>
          <input id="pd-num" value="${ed?p.num:'(gerado ao formalizar)'}" readonly style="background:#f4f6f8"></div>
        <div class="campo"><label for="pd-data">Data</label>
          <input id="pd-data" value="${ed?dataBR(p.data):dataBR(new Date().toISOString().slice(0,10))}" readonly style="background:#f4f6f8"></div>
        <div class="campo"><label for="pd-sit">Situação</label>
          <input id="pd-sit" value="${ed?p.status:'RASCUNHO'}" readonly style="background:#f4f6f8"></div>
        <div class="campo" style="grid-column:1/-1"><label for="pd-req">Requisito atendido</label>
          <select id="pd-req" ${ed?'disabled':''} onchange="rascunho.req=+this.value;ir('pedido-form',ctx)">
            ${BD.requisitos.map(x=>`<option value="${x.id}" ${x.id===idReq?'selected':''}>${String(x.id).padStart(3,'0')} — ${x.desc}</option>`).join('')}</select></div>
        <div class="campo" style="grid-column:1/-1"><label for="pd-forn">Fornecedor</label>
          <select id="pd-forn" ${ed?'disabled':''} onchange="rascunho.forn=+this.value;ir('pedido-form',ctx)">
            ${BD.fornecedores.map(x=>`<option value="${x.id}" ${x.id===idForn?'selected':''}>${fmtCNPJ(PJ(x.id).cnpj)} — ${P(x.id).nome}</option>`).join('')}</select>
          <div class="dica">Limite de gastos do fornecedor: <b>${moeda(f.limite)}</b> · Valor estimado do requisito: <b>${moeda(r.valor)}</b></div></div>
      </div>
     </div>
     <div class="card"><h3>Itens do pedido</h3>
      <div class="msg msg-erro" id="msg-item"></div>
      <table><thead><tr><th>Descrição</th><th style="width:110px">Quantidade</th><th style="width:150px">Valor unitário</th><th style="width:150px">Subtotal</th><th style="width:70px"></th></tr></thead><tbody>`+
      (itens.length?itens.map((i,ix)=>`<tr><td>${i.d}</td><td class="num">${i.q}</td><td class="num">${moeda(i.v)}</td>
        <td class="num"><b>${moeda(i.q*i.v)}</b></td>
        <td>${editavel?`<button class="btn-mini perigo" onclick="removerItem(${ix})">Excluir</button>`:''}</td></tr>`).join('')
      :`<tr><td colspan="5" class="vazio">Nenhum item lançado. Adicione ao menos um item para formalizar o pedido.</td></tr>`)+
      (editavel?`<tr style="background:#fafcfe">
        <td><input id="it-desc" aria-label="Descrição do item" placeholder="Descrição do item" style="width:100%;padding:6px 8px;border:1px solid var(--borda);border-radius:5px"></td>
        <td><input id="it-qtd" type="number" min="1" value="1" aria-label="Quantidade" style="width:100%;padding:6px 8px;border:1px solid var(--borda);border-radius:5px"></td>
        <td><input id="it-valor" type="number" step="0.01" min="0.01" placeholder="0,00" aria-label="Valor unitário" style="width:100%;padding:6px 8px;border:1px solid var(--borda);border-radius:5px"></td>
        <td class="num" style="color:var(--texto-fraco)">—</td>
        <td><button class="btn-mini" onclick="adicionarItem()">Adicionar</button></td></tr>`:'')+
      `</tbody></table>
      <div class="itens-total"><span>Valor total do pedido:</span> <b>${moeda(total)}</b></div>`+
      (total>f.limite?`<div class="msg msg-alerta ver" style="margin-top:14px"><strong>Atenção — limite de gastos excedido</strong>
        O valor total (${moeda(total)}) supera o limite autorizado para este fornecedor (${moeda(f.limite)}).</div>`:'')+
      `<div class="acoes">
        <button class="btn btn-2" onclick="ir('pedido-lista')">Voltar</button>
        ${ed&&p.status==='RASCUNHO'?`<button class="btn btn-1" onclick="apresentar(${p.id})">Apresentar pedido</button>`
          :ed?'':`<button class="btn btn-1" onclick="formalizarPedido()">Formalizar pedido</button>`}
      </div>
     </div>`+
    (ed&&p.val?`<div class="card"><h3>Resultado da validação</h3>
      <div class="msg ${p.val.res==='APROVADO'?'msg-ok':'msg-erro'} ver">
        <strong>Pedido ${p.val.res}</strong>${p.val.parecer}<br><small>Validado em ${dataBR(p.val.data)}.</small></div></div>`:'')+
    rodape('Cenário de erro <b>Contato com Fornecedores e Realização do Pedido (Erros)</b>: o sistema registra a falha de contato e solicita nova tentativa.');
};

/* --------- TELA 19 — VALIDAÇÃO DE PEDIDOS --------- */
TELAS['pedido-validacao'] = () => {
  const pend = BD.pedidos.filter(p=>!p.val && p.status!=='RASCUNHO');
  const feitas = BD.pedidos.filter(p=>p.val);
  return cab('Processo de Fornecimento › Validação','Validação de pedidos',
    'Casos de uso Apresentação do Pedido e Validação. Pré-condição: o pedido deve ter sido apresentado e estar aguardando aprovação.')+
    (ctx.msg?`<div class="msg ${ctx.tipoMsg||'msg-ok'} ver">${ctx.msg}</div>`:'')+
    fluxo(4)+
    `<div class="card"><h3>Pedidos aguardando validação (${pend.length})</h3>`+
    (pend.length?pend.map(p=>{
      const f=BD.fornecedores.find(x=>x.id===p.forn), r=BD.requisitos.find(x=>x.id===p.req), t=totalPedido(p);
      const acima = t>r.valor;
      return `<div style="border:1px solid var(--borda);border-radius:6px;padding:14px;margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div><b style="font-size:15px">${p.num}</b> — ${P(p.forn).nome}
            <div style="font-size:12px;color:var(--texto-fraco)">${r.desc}</div></div>
          <span class="tag t-alerta">${p.status}</span>
        </div>
        <div class="grid g4" style="font-size:12.5px;margin-bottom:12px">
          <div><span style="color:var(--texto-fraco)">Valor do pedido</span><br><b>${moeda(t)}</b></div>
          <div><span style="color:var(--texto-fraco)">Valor estimado</span><br><b>${moeda(r.valor)}</b></div>
          <div><span style="color:var(--texto-fraco)">Variação</span><br>
            <b style="color:${acima?'var(--vermelho)':'var(--verde)'}">${(t/r.valor*100-100).toFixed(1)}%</b></div>
          <div><span style="color:var(--texto-fraco)">Limite do fornecedor</span><br><b>${moeda(f.limite)}</b></div>
        </div>
        <div class="campo"><label for="par-${p.id}">Parecer <span class="obr">*</span></label>
          <input id="par-${p.id}" placeholder="Justificativa da aprovação ou reprovação"></div>
        <div class="acoes" style="border:0;padding-top:12px">
          <button class="btn btn-perigo" onclick="validar(${p.id},'REPROVADO')">Reprovar</button>
          <button class="btn btn-ok" onclick="validar(${p.id},'APROVADO')">Aprovar</button>
        </div></div>`;
    }).join('')
    :`<div class="vazio">Nenhum pedido aguardando validação no momento.</div>`)+
    `</div>
     <div class="card"><h3>Histórico de validações</h3>
      <table><thead><tr><th>Pedido</th><th>Fornecedor</th><th>Valor</th><th>Resultado</th><th>Parecer</th><th>Data</th></tr></thead><tbody>`+
      (feitas.length?feitas.map(p=>`<tr><td><b>${p.num}</b></td><td>${P(p.forn).nome}</td>
        <td class="num">${moeda(totalPedido(p))}</td>
        <td><span class="tag ${p.val.res==='APROVADO'?'t-ativo':'t-erro'}">${p.val.res}</span></td>
        <td style="font-size:12px">${p.val.parecer}</td><td>${dataBR(p.val.data)}</td></tr>`).join('')
      :`<tr><td colspan="6" class="vazio">Nenhuma validação registrada.</td></tr>`)+
      `</tbody></table></div>`+
    rodape('Pós-condição: o pedido é aprovado ou reprovado, com registro do resultado no sistema (tabela <code>validacao_pedido</code>).');
};
function validar(id,res){
  const p=BD.pedidos.find(x=>x.id===id);
  const parecer=(document.getElementById('par-'+id)||{}).value||'';
  if(!parecer.trim()){
    ir('pedido-validacao',{tipoMsg:'msg-erro',
      msg:`<strong>Validação (Erros) — parecer não informado</strong>O sistema registra o erro de validação e notifica o responsável. Informe o parecer antes de concluir.`});
    return;
  }
  p.val={res,parecer,data:new Date().toISOString().slice(0,10)};
  p.status=res;
  ir('pedido-validacao',{tipoMsg:res==='APROVADO'?'msg-ok':'msg-alerta',
    msg:`<strong>Pedido ${res.toLowerCase()}</strong>O resultado da validação do pedido <b>${p.num}</b> foi registrado no sistema.`});
}

/* --------- TELA 20 — AUDITORIA --------- */
TELAS['auditoria'] = () => {
  const fTab = ctx.tab||'Todas', fOp = ctx.op||'Todas';
  const linhas = BD.log.filter(l=>
    (fTab==='Todas' || l.tab===fTab) && (fOp==='Todas' || l.op===fOp));
  return cab('Auditoria','Registro de alterações',
    'Trilha de auditoria exigida pela pós-condição do UC02: data, hora e responsável por cada modificação.')+
    `<div class="card">
      <div class="barra">
        <div class="campo"><label for="a-tab">Tabela</label>
          <select id="a-tab"><option>Todas</option>${[...new Set(BD.log.map(l=>l.tab))].map(t=>`<option ${t===fTab?'selected':''}>${t}</option>`).join('')}</select></div>
        <div class="campo"><label for="a-op">Operação</label>
          <select id="a-op">${['Todas','INSERCAO','ATUALIZACAO','INATIVACAO','REATIVACAO'].map(o=>`<option ${o===fOp?'selected':''}>${o}</option>`).join('')}</select></div>
        <button class="btn btn-1" onclick="ir('auditoria',{tab:document.getElementById('a-tab').value,op:document.getElementById('a-op').value})">Filtrar</button>
        <button class="btn btn-2" onclick="ir('auditoria')">Limpar</button>
      </div>
      <table><thead><tr><th>Data / hora</th><th>Tabela</th><th>Registro</th><th>Operação</th><th>Campo</th>
        <th>Valor anterior</th><th>Valor novo</th><th>Responsável</th></tr></thead><tbody>`+
      (linhas.length?linhas.map(l=>`<tr><td style="white-space:nowrap">${l.data}</td><td><code>${l.tab}</code></td><td class="num">${l.reg}</td>
        <td><span class="tag ${l.op==='INATIVACAO'?'t-erro':l.op==='ATUALIZACAO'?'t-alerta':'t-ativo'}">${l.op}</span></td>
        <td>${l.campo}</td><td style="font-size:12px;color:var(--texto-fraco)">${l.ant}</td>
        <td style="font-size:12px">${l.novo}</td><td style="font-size:12px">${l.user}</td></tr>`).join('')
      :`<tr><td colspan="8" class="vazio">Nenhum registro de alteração com os filtros informados.</td></tr>`)+
      `</tbody></table></div>`+
    rodape('Tabela <code>log_alteracao</code>. As ações realizadas neste protótipo alimentam esta tela em tempo real.');
};
