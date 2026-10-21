const systems=[
{name:"Nervous system",icon:"⌁",desc:"Receives information, processes signals, and coordinates responses.",organs:"Brain, spinal cord, nerves"},
{name:"Cardiovascular",icon:"♡",desc:"Moves blood to deliver oxygen and nutrients and carry away waste.",organs:"Heart, blood, blood vessels"},
{name:"Respiratory",icon:"♧",desc:"Brings oxygen into the body and removes carbon dioxide.",organs:"Lungs, trachea, diaphragm"},
{name:"Digestive",icon:"◉",desc:"Breaks food down and absorbs nutrients for energy and growth.",organs:"Stomach, intestines, liver, pancreas"},
{name:"Skeletal",icon:"⌇",desc:"Supports the body, protects organs, and helps produce blood cells.",organs:"Bones, joints, cartilage"},
{name:"Muscular",icon:"ϟ",desc:"Enables movement, maintains posture, and generates body heat.",organs:"Skeletal, smooth, cardiac muscle"},
{name:"Endocrine",icon:"✧",desc:"Uses hormones to regulate growth, metabolism, and reproduction.",organs:"Pituitary, thyroid, adrenal glands"},
{name:"Urinary",icon:"♢",desc:"Filters blood, balances fluids, and removes waste in urine.",organs:"Kidneys, ureters, bladder"},
{name:"Immune & lymphatic",icon:"✚",desc:"Defends against pathogens and returns tissue fluid to circulation.",organs:"Lymph nodes, spleen, white blood cells"},
{name:"Integumentary",icon:"◇",desc:"Forms a protective barrier and helps regulate temperature.",organs:"Skin, hair, nails, sweat glands"},
{name:"Reproductive",icon:"❋",desc:"Supports reproduction and the production of sex hormones.",organs:"Female and male reproductive organs"}
];
const organs={
"Heart":{icon:"♥",category:"CARDIOVASCULAR SYSTEM",desc:"The heart is a muscular organ that contracts rhythmically to circulate blood through the lungs and the rest of the body.",func:"Pumps blood, supplying tissues with oxygen and nutrients.",note:"The right side sends blood to the lungs; the left side sends oxygen-rich blood to the body."},
"Lungs":{icon:"♧",category:"RESPIRATORY SYSTEM",desc:"The lungs are paired, spongy organs in the chest. Tiny air sacs called alveoli are where gas exchange occurs.",func:"Move oxygen into the bloodstream and remove carbon dioxide.",note:"The diaphragm and other respiratory muscles help air move in and out."},
"Brain":{icon:"✧",category:"NERVOUS SYSTEM",desc:"The brain is the body's major control centre. It interprets sensory information and coordinates thought, memory, movement, and many automatic functions.",func:"Processes information and coordinates body functions.",note:"The brain, spinal cord, and peripheral nerves work together as the nervous system."},
"Stomach":{icon:"◉",category:"DIGESTIVE SYSTEM",desc:"The stomach is a muscular organ that temporarily stores food and mixes it with acid and digestive enzymes.",func:"Mechanically and chemically breaks down food before it enters the small intestine.",note:"Most nutrient absorption occurs in the small intestine, not the stomach."},
"Kidneys":{icon:"♢",category:"URINARY SYSTEM",desc:"The kidneys are two bean-shaped organs that filter blood and adjust the body's water, electrolyte, and acid-base balance.",func:"Remove waste and extra water to form urine.",note:"The kidneys also help regulate blood pressure and support red blood cell production."},
"Liver":{icon:"⬟",category:"DIGESTIVE / METABOLIC",desc:"The liver is a large organ in the upper right abdomen with important metabolic, storage, and detoxification roles.",func:"Processes nutrients, makes bile, and helps metabolise many substances.",note:"The liver makes bile; the gallbladder stores and concentrates it."}
};
const quiz=[
{q:"Which organ pumps blood around the body?",a:["Lungs","Heart","Kidneys","Stomach"],correct:1,why:"The heart's rhythmic contractions circulate blood through the pulmonary and systemic circuits."},
{q:"Where does most nutrient absorption take place?",a:["Oesophagus","Stomach","Small intestine","Large intestine"],correct:2,why:"The small intestine's lining is specialised for absorbing most nutrients."},
{q:"Which organs exchange oxygen and carbon dioxide?",a:["Kidneys","Lungs","Liver","Pancreas"],correct:1,why:"Gas exchange takes place in the alveoli within the lungs."},
{q:"Which system sends rapid electrical signals around the body?",a:["Skeletal","Digestive","Nervous","Integumentary"],correct:2,why:"The brain, spinal cord, and nerves transmit and process electrical signals."},
{q:"What is a major function of the kidneys?",a:["Pumping blood","Filtering blood and forming urine","Digesting fats","Exchanging gases"],correct:1,why:"The kidneys filter blood, regulate fluid balance, and produce urine."}
];
const $=id=>document.getElementById(id);
function systemCard(s){return `<button class="system-card" data-system="${s.name}"><span class="system-icon">${s.icon}</span><b>${s.name}</b><small>${s.desc}</small></button>`}
function organCard(name,o){return `<button class="organ-card" data-organ="${name}"><span class="organ-symbol">${o.icon}</span><span><b>${name}</b><p>${o.func}</p></span></button>`}
$("system-grid").innerHTML=systems.slice(0,4).map(systemCard).join("");
$("all-systems").innerHTML=systems.map(systemCard).join("");
$("organ-grid").innerHTML=Object.entries(organs).slice(0,6).map(([n,o])=>organCard(n,o)).join("");
function openOrgan(name){let o=organs[name];if(!o){const s=systems.find(x=>x.name===name);if(s){$("modal-category").textContent="BODY SYSTEM OVERVIEW";$("modal-title").textContent=s.name;$("modal-icon").textContent=s.icon;$("modal-desc").textContent=s.desc;$("modal-function").textContent=s.desc;$("modal-note").textContent="Common structures: "+s.organs+". This summary is for general learning and does not replace clinical guidance.";$("modal").classList.remove("hidden")}return}
$("modal-category").textContent=o.category;$("modal-title").textContent=name;$("modal-icon").textContent=o.icon;$("modal-desc").textContent=o.desc;$("modal-function").textContent=o.func;$("modal-note").textContent=o.note;$("modal").classList.remove("hidden")}
function showView(v){document.querySelectorAll(".view").forEach(x=>x.classList.add("hidden"));$(v+"-view").classList.remove("hidden");document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.view===v));$("page-title").textContent=({atlas:"Human Anatomy Atlas",systems:"Explore Body Systems",quiz:"Knowledge Check"})[v];window.scrollTo({top:0,behavior:"smooth"})}
document.addEventListener("click",e=>{let o=e.target.closest("[data-organ]");if(o)openOrgan(o.dataset.organ);let s=e.target.closest("[data-system]");if(s)openOrgan(s.dataset.system);let n=e.target.closest("[data-view]");if(n)showView(n.dataset.view);let g=e.target.closest("[data-goto]");if(g)showView(g.dataset.goto)});
$("close-modal").onclick=$("modal-done").onclick=()=>$("modal").classList.add("hidden");
$("modal").addEventListener("click",e=>{if(e.target===$("modal"))$("modal").classList.add("hidden")});
let qi=0,score=0,answered=false;
function renderQuestion(){let q=quiz[qi];answered=false;$("quiz-count").textContent=`QUESTION ${String(qi+1).padStart(2,"0")} / ${String(quiz.length).padStart(2,"0")}`;$("quiz-score").textContent="SCORE "+score;$("progress-fill").style.width=((qi+1)/quiz.length*100)+"%";$("question").textContent=q.q;$("feedback").textContent="";$("next-question").disabled=true;$("next-question").textContent=qi===quiz.length-1?"See results ↗":"Next question →";$("answers").innerHTML=q.a.map((a,i)=>`<button class="answer" data-answer="${i}">${String.fromCharCode(65+i)}. &nbsp; ${a}</button>`).join("")}
$("answers").addEventListener("click",e=>{let b=e.target.closest("[data-answer]");if(!b||answered)return;answered=true;let q=quiz[qi],pick=Number(b.dataset.answer);document.querySelectorAll(".answer").forEach((x,i)=>{x.disabled=true;if(i===q.correct)x.classList.add("correct");if(i===pick&&pick!==q.correct)x.classList.add("wrong")});if(pick===q.correct){score++;$("feedback").textContent="Correct! "+q.why}else $("feedback").textContent="Not quite. "+q.why;$("quiz-score").textContent="SCORE "+score;$("next-question").disabled=false});
$("next-question").onclick=()=>{if(qi<quiz.length-1){qi++;renderQuestion()}else{$("question").textContent=`You scored ${score} out of ${quiz.length}.`; $("answers").innerHTML="";$("feedback").textContent=score>=4?"Excellent work — keep exploring!":"Good start — review the body systems and try again."; $("next-question").textContent="Try again ↻";$("next-question").disabled=false;$("next-question").onclick=()=>{qi=0;score=0;renderQuestion();$("next-question").onclick=nextAction}}};
const nextAction=$("next-question").onclick;renderQuestion();
