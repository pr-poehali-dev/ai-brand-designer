import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  brand: "https://cdn.poehali.dev/projects/49fc1a22-a8b5-490a-aa8b-7600bc17f4db/files/30956fda-49b0-4fd5-9802-41902dc378d3.jpg",
  web: "https://cdn.poehali.dev/projects/49fc1a22-a8b5-490a-aa8b-7600bc17f4db/files/8100a802-6227-442a-87d6-acae695f1c29.jpg",
  pack: "https://cdn.poehali.dev/projects/49fc1a22-a8b5-490a-aa8b-7600bc17f4db/files/5cb5d385-199f-488b-a61e-599aa2f4fa60.jpg",
  motion: "https://cdn.poehali.dev/projects/49fc1a22-a8b5-490a-aa8b-7600bc17f4db/files/633a7f97-3c11-4668-b0e3-3736355f94a1.jpg",
  print: "https://cdn.poehali.dev/projects/49fc1a22-a8b5-490a-aa8b-7600bc17f4db/files/4ab0744e-699a-4ae9-b309-c2efd987e2c5.jpg",
};

const projects = [
  { id: 1, title: "Volta — Фирменный стиль", category: "Брендинг", year: "2024", image: IMAGES.brand, tags: ["Айдентика", "Логотип", "Гайдлайн"], description: "Разработка полной визуальной идентичности для стартапа в сфере технологий. Лаконичный знак, нейтральная типографика, расширяемая система." },
  { id: 2, title: "Forma — Веб-платформа", category: "Веб-дизайн", year: "2024", image: IMAGES.web, tags: ["UI/UX", "Дизайн-система", "Прототип"], description: "Проектирование интерфейса B2B-сервиса: от исследования пользователей до финального дизайна и передачи разработчикам." },
  { id: 3, title: "Arborea — Упаковка", category: "Упаковка", year: "2023", image: IMAGES.pack, tags: ["Упаковка", "Иллюстрация", "Полиграфия"], description: "Серия упаковки для органической косметики. Принцип: максимум белого пространства, минимум декора." },
  { id: 4, title: "Nocturne — Моушн", category: "Моушн", year: "2023", image: IMAGES.motion, tags: ["After Effects", "3D", "Видео"], description: "Анимационный ролик для музыкального лейбла. Абстрактные формы следуют ритму трека." },
  { id: 5, title: "Страта — Журнал", category: "Полиграфия", year: "2023", image: IMAGES.print, tags: ["Редакционный дизайн", "Типографика"], description: "Дизайн ежеквартального журнала об архитектуре и городской среде. 120 полос, авторская сетка." },
];

const categories = ["Все", "Брендинг", "Веб-дизайн", "Упаковка", "Моушн", "Полиграфия"];

const processSteps = [
  { num: "01", title: "Брифинг", text: "Изучаю задачу, аудиторию и контекст бизнеса. Задаю острые вопросы." },
  { num: "02", title: "Исследование", text: "Анализирую рынок, конкурентов, референсы. Формирую направление." },
  { num: "03", title: "Концепция", text: "Предлагаю 2–3 варианта стратегии. Обсуждаем, выбираем вектор." },
  { num: "04", title: "Производство", text: "Создаю финальный дизайн с вниманием к каждой детали." },
  { num: "05", title: "Передача", text: "Подготавливаю все файлы и гайды. Сопровождаю внедрение." },
];

const services = [
  { title: "Брендинг", desc: "Фирменный стиль, логотип, айдентика, брендбук", price: "от 80 000 ₽" },
  { title: "Веб-дизайн", desc: "UI/UX, дизайн-системы, прототипирование, лендинги", price: "от 60 000 ₽" },
  { title: "Упаковка", desc: "Дизайн тары, этикеток, POS-материалов", price: "от 40 000 ₽" },
  { title: "Полиграфия", desc: "Каталоги, журналы, презентации, бизнес-печать", price: "от 25 000 ₽" },
];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "Все"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedProject]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)", color: "var(--ink)" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(247,246,244,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--line)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-display text-xl font-light tracking-wide"
          >
            А.С.
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[["about", "О мне"], ["services", "Услуги"], ["portfolio", "Работы"], ["process", "Процесс"], ["contact", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link">{label}</button>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-5" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}>
            {[["about", "О мне"], ["services", "Услуги"], ["portfolio", "Работы"], ["process", "Процесс"], ["contact", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left nav-link text-sm">{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col justify-end pb-20 px-6 pt-32">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-8 opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--stone)" }}>Графический дизайнер · Москва</span>
          </div>
          <h1
            className="font-display font-light leading-none mb-10 opacity-0 animate-fade-up delay-100"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", letterSpacing: "-0.02em", animationFillMode: "forwards" }}
          >
            Анна<br />
            <em style={{ color: "var(--stone)" }}>Смирнова</em>
          </h1>
          <hr className="thin-rule mb-10 opacity-0 animate-fade-up delay-200" style={{ animationFillMode: "forwards" }} />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 opacity-0 animate-fade-up delay-300" style={{ animationFillMode: "forwards" }}>
            <p className="font-body font-light max-w-md" style={{ color: "var(--stone)", lineHeight: 1.7, fontSize: "1.05rem" }}>
              Создаю визуальные системы, которые работают.<br />
              Брендинг, веб, упаковка — с 2017 года.
            </p>
            <div className="flex gap-6">
              <button onClick={() => scrollTo("portfolio")} className="font-body text-xs tracking-widest uppercase border-b border-current pb-1 hover:opacity-50 transition-opacity">
                Смотреть работы
              </button>
              <button onClick={() => scrollTo("contact")} className="font-body text-xs tracking-widest uppercase pb-1 hover:opacity-50 transition-opacity" style={{ color: "var(--stone)" }}>
                Связаться
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs tracking-widest uppercase mb-6 block" style={{ color: "var(--stone)" }}>О мне</span>
            <h2 className="font-display font-light text-5xl md:text-6xl leading-tight mb-8" style={{ letterSpacing: "-0.02em" }}>
              Дизайн как<br /><em>ясность мысли</em>
            </h2>
          </div>
          <div className="flex flex-col gap-6 pt-4 md:pt-16">
            <p className="font-body font-light" style={{ color: "var(--stone)", lineHeight: 1.8, fontSize: "1rem" }}>
              7 лет я помогаю брендам обрести голос через визуальный язык. Работаю с компаниями от стартапов до международных холдингов.
            </p>
            <p className="font-body font-light" style={{ color: "var(--stone)", lineHeight: 1.8, fontSize: "1rem" }}>
              Верю в дизайн, который решает задачи, а не украшает. В типографику, которую читают. В систему, которую можно масштабировать.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6" style={{ borderTop: "1px solid var(--line)" }}>
              {[["60+", "Проектов"], ["7", "Лет опыта"], ["3", "Награды"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display font-light text-3xl mb-1">{num}</div>
                  <div className="text-xs tracking-wide uppercase" style={{ color: "var(--stone)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6" style={{ borderTop: "1px solid var(--line)", background: "white" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: "var(--stone)" }}>Услуги</span>
              <h2 className="font-display font-light text-5xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>Чем я занимаюсь</h2>
            </div>
            <p className="font-body font-light max-w-xs text-sm" style={{ color: "var(--stone)", lineHeight: 1.7 }}>
              Работаю под ключ или подключаюсь на нужном этапе
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-0">
            {services.map((s, i) => (
              <div key={i} className="service-card py-8 px-0 md:px-8 group cursor-default">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-3xl font-light">{s.title}</h3>
                  <span className="font-body text-xs mt-2" style={{ color: "var(--stone)" }}>{s.price}</span>
                </div>
                <p className="font-body text-sm font-light" style={{ color: "var(--stone)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28 px-6" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: "var(--stone)" }}>Портфолио</span>
              <h2 className="font-display font-light text-5xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>Избранные работы</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className="project-card cursor-pointer group"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="overflow-hidden mb-4" style={{ aspectRatio: "4/3", background: "#eee" }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-body text-sm font-medium mb-1">{project.title}</h3>
                    <span className="text-xs" style={{ color: "var(--stone)" }}>{project.category}</span>
                  </div>
                  <span className="text-xs mt-1" style={{ color: "var(--stone)" }}>{project.year}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20" style={{ color: "var(--stone)" }}>
              <p className="font-display text-3xl font-light">Нет работ в этой категории</p>
            </div>
          )}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 px-6" style={{ borderTop: "1px solid var(--line)", background: "white" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: "var(--stone)" }}>Процесс</span>
            <h2 className="font-display font-light text-5xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>Как я работаю</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-0">
            {processSteps.map((step, i) => (
              <div key={i} className="py-8 pr-8" style={{ borderTop: "1px solid var(--line)" }}>
                <div className="process-number mb-4">{step.num}</div>
                <h3 className="font-body font-medium text-sm mb-3 tracking-wide uppercase">{step.title}</h3>
                <p className="font-body font-light text-xs" style={{ color: "var(--stone)", lineHeight: 1.8 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs tracking-widest uppercase mb-6 block" style={{ color: "var(--stone)" }}>Контакты</span>
              <h2 className="font-display font-light leading-tight mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}>
                Давайте<br /><em>поговорим</em>
              </h2>
              <p className="font-body font-light mb-10" style={{ color: "var(--stone)", lineHeight: 1.8 }}>
                Расскажите о проекте — отвечу в течение суток и предложу формат сотрудничества.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "Mail", label: "Email", value: "anna@example.com" },
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                  { icon: "MapPin", label: "Город", value: "Москва" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4" style={{ borderTop: "1px solid var(--line)", paddingTop: "1rem" }}>
                    <Icon name={item.icon} fallback="Mail" size={16} style={{ color: "var(--stone)" }} />
                    <div>
                      <div className="text-xs tracking-wide uppercase mb-0.5" style={{ color: "var(--stone)" }}>{item.label}</div>
                      <div className="font-body text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--stone)" }}>Имя</label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full font-body text-sm font-light py-3 px-0 bg-transparent outline-none"
                  style={{ borderBottom: "1px solid var(--line)", color: "var(--ink)" }}
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--stone)" }}>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full font-body text-sm font-light py-3 px-0 bg-transparent outline-none"
                  style={{ borderBottom: "1px solid var(--line)", color: "var(--ink)" }}
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--stone)" }}>Задача</label>
                <textarea
                  placeholder="Расскажите о проекте..."
                  rows={4}
                  className="w-full font-body text-sm font-light py-3 px-0 bg-transparent outline-none resize-none"
                  style={{ borderBottom: "1px solid var(--line)", color: "var(--ink)" }}
                />
              </div>
              <button
                type="submit"
                className="mt-4 font-body text-xs tracking-widest uppercase py-4 transition-all duration-300 hover:opacity-80"
                style={{ background: "var(--ink)", color: "var(--paper)" }}
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid var(--line)", background: "white" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-light">А.С.</span>
          <span className="text-xs" style={{ color: "var(--stone)" }}>© 2024 Анна Смирнова. Все права защищены.</span>
          <div className="flex gap-6">
            {["Behance", "Instagram", "Telegram"].map(s => (
              <button key={s} className="text-xs tracking-wide nav-link">{s}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(20,20,20,0.7)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedProject(null); }}
        >
          <div
            className="modal-content w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ background: "var(--paper)" }}
            ref={modalRef}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full object-cover"
                style={{ maxHeight: "50vh" }}
              />
              <button
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-60"
                style={{ background: "var(--paper)" }}
                onClick={() => setSelectedProject(null)}
              >
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="p-8 md:p-12">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs tracking-widest uppercase mb-2 block" style={{ color: "var(--stone)" }}>
                    {selectedProject.category} · {selectedProject.year}
                  </span>
                  <h2 className="font-display font-light text-4xl" style={{ letterSpacing: "-0.02em" }}>
                    {selectedProject.title}
                  </h2>
                </div>
              </div>
              <hr className="thin-rule mb-6" />
              <p className="font-body font-light mb-8" style={{ color: "var(--stone)", lineHeight: 1.8 }}>
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="text-xs tracking-wide uppercase px-3 py-1.5" style={{ border: "1px solid var(--line)", color: "var(--stone)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="font-body text-xs tracking-widest uppercase border-b border-current pb-1 hover:opacity-50 transition-opacity"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}