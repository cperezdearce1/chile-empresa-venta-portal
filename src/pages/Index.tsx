import React, { useEffect, useState } from 'react';
import { Phone, Shield, Users, FileText, TrendingUp, Mail, MapPin, ChevronDown, Menu, X, MessageCircle } from 'lucide-react';
import Logo from '../components/Logo';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  sector: string;
  empleados: string;
  ventas: string;
  timing: string;
  descripcion: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  empresa?: string;
  sector?: string;
  empleados?: string;
  ventas?: string;
  timing?: string;
}

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    sector: '',
    empleados: '',
    ventas: '',
    timing: '',
    descripcion: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    // Scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^(\+56|56)?[2-9]\d{8}$/.test(phone.replace(/\s/g, ''));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};

    // Validaciones
    if (!formData.nombre.trim()) errors.nombre = 'Nombre requerido';
    if (!formData.email.trim()) errors.email = 'Email requerido';
    else if (!validateEmail(formData.email)) errors.email = 'Email inválido';
    if (!formData.telefono.trim()) errors.telefono = 'Teléfono requerido';
    else if (!validatePhone(formData.telefono)) errors.telefono = 'Teléfono chileno inválido';
    if (!formData.empresa.trim()) errors.empresa = 'Nombre de empresa requerido';
    if (!formData.sector) errors.sector = 'Sector requerido';
    if (!formData.empleados) errors.empleados = 'Número de empleados requerido';
    if (!formData.ventas) errors.ventas = 'Ventas anuales requeridas';
    if (!formData.timing) errors.timing = 'Timing de venta requerido';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // Enviar formulario a la API de Vercel
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          // Redirigir a la página de éxito
          window.location.href = '/success.html';
        } else {
          alert('Error al enviar el formulario. Por favor, intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error al enviar el formulario. Por favor, intenta nuevamente.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error al escribir
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo onClick={handleLogoClick} />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="hover:text-purple-400 transition-colors duration-500">Inicio</a>
              <a href="#beneficios" className="hover:text-purple-400 transition-colors duration-500">Beneficios</a>
              <a href="#proceso" className="hover:text-purple-400 transition-colors duration-500">Proceso</a>
              <a href="#contacto" className="hover:text-purple-400 transition-colors duration-500">Contacto</a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
              <div className="flex flex-col space-y-4">
                <a href="#inicio" className="hover:text-purple-400 transition-colors duration-500">Inicio</a>
                <a href="#beneficios" className="hover:text-purple-400 transition-colors duration-500">Beneficios</a>
                <a href="#proceso" className="hover:text-purple-400 transition-colors duration-500">Proceso</a>
                <a href="#contacto" className="hover:text-purple-400 transition-colors duration-500">Contacto</a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-gray-900 to-gray-900"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            ¿Listo para Vender tu Empresa
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              y Retirarte Tranquilo?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Buscamos empresas exitosas para comprar en Chile. Te ofrecemos un proceso transparente, 
            valoración justa y continuidad para tu equipo.
          </p>
          
          <button 
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                     px-8 py-4 rounded-full text-lg font-semibold transition-all duration-700
                     transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            Quiero que me contacten
          </button>

          {/* Credibility badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 text-sm text-gray-400">
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
              <Shield size={16} className="text-purple-400" />
              Evaluación profesional gratuita
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
              <FileText size={16} className="text-purple-400" />
              Confidencialidad garantizada
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
              <TrendingUp size={16} className="text-purple-400" />
              Proceso sin compromiso inicial
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 animate-on-scroll">
            Por qué <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">elegirnos</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FileText size={40} />,
                title: "Evaluación y oferta sin compromiso",
                description: "Analizamos tu empresa de forma profesional y te presentamos una propuesta sin obligaciones."
              },
              {
                icon: <Users size={40} />,
                title: "Respetamos a tu equipo y cultura empresarial",
                description: "Valoramos el trabajo de tu equipo y mantenemos la esencia de tu empresa."
              },
              {
                icon: <Shield size={40} />,
                title: "Proceso transparente y profesional",
                description: "Cada paso del proceso es claro, documentado y realizado con total transparencia."
              },
              {
                icon: <TrendingUp size={40} />,
                title: "Experiencia en análisis financiero empresarial",
                description: "Contamos con la experiencia necesaria para valorar correctamente tu negocio."
              }
            ].map((benefit, index) => (
              <div key={index} className="group animate-on-scroll">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full 
                              transition-all duration-700 hover:bg-gray-800/70 hover:border-purple-500/50 
                              hover:transform hover:scale-105">
                  <div className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors duration-500">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 animate-on-scroll">
            Nuestro <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Proceso</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                number: "1",
                title: "Conversación inicial",
                description: "Conocemos tu empresa y motivaciones"
              },
              {
                number: "2",
                title: "Evaluación profesional",
                description: "Análisis detallado del valor"
              },
              {
                number: "3",
                title: "Propuesta formal",
                description: "Oferta seria y transparente"
              },
              {
                number: "4",
                title: "Cierre seguro",
                description: "Documentación y transferencia"
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start mb-8 animate-on-scroll">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 
                              rounded-full flex items-center justify-center text-xl font-bold mr-6">
                  {step.number}
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-lg">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="absolute left-8 mt-16 w-0.5 h-8 bg-gradient-to-b from-purple-600 to-blue-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-4xl font-bold mb-8">
              Experiencia que Genera <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Confianza</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {[
                "Profesional con experiencia en análisis financiero y evaluación de empresas",
                "Enfoque serio y transparente en cada transacción",
                "Comprometidos con preservar el legado de tu empresa",
                "Respaldo financiero para concretar operaciones"
              ].map((point, index) => (
                <div key={index} className="flex items-start text-left">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-lg text-gray-300">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contacto" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 animate-on-scroll">
              Contacta con <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Nosotros</span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12">
              Cuéntanos sobre tu empresa y te contactaremos para una evaluación profesional gratuita
            </p>
            
            <form 
              onSubmit={handleFormSubmit} 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 animate-on-scroll"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-500"
                  />
                  {formErrors.nombre && <p className="text-red-400 text-sm mt-1">{formErrors.nombre}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-500"
                  />
                  {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-500"
                  />
                  {formErrors.telefono && <p className="text-red-400 text-sm mt-1">{formErrors.telefono}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre de la empresa *</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-500"
                  />
                  {formErrors.empresa && <p className="text-red-400 text-sm mt-1">{formErrors.empresa}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">¿Qué hace tu empresa? *</label>
                  <div className="relative">
                    <select
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-500 appearance-none"
                    >
                      <option value="">Selecciona un sector</option>
                      <option value="manufactura">Manufactura</option>
                      <option value="servicios">Servicios</option>
                      <option value="comercio">Comercio</option>
                      <option value="construccion">Construcción</option>
                      <option value="alimentos">Alimentos</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="otro">Otro</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {formErrors.sector && <p className="text-red-400 text-sm mt-1">{formErrors.sector}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">¿Cuántos empleados tienes? *</label>
                  <div className="relative">
                    <select
                      name="empleados"
                      value={formData.empleados}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-500 appearance-none"
                    >
                      <option value="">Selecciona cantidad</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="mas-200">Más de 200</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {formErrors.empleados && <p className="text-red-400 text-sm mt-1">{formErrors.empleados}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ventas anuales aproximadas *</label>
                  <div className="relative">
                    <select
                      name="ventas"
                      value={formData.ventas}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-500 appearance-none"
                    >
                      <option value="">Selecciona rango</option>
                      <option value="menos-100mm">Menos de $100MM</option>
                      <option value="100mm-500mm">$100MM-$500MM</option>
                      <option value="500mm-2000mm">$500MM-$2.000MM</option>
                      <option value="mas-2000mm">Más de $2.000MM</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {formErrors.ventas && <p className="text-red-400 text-sm mt-1">{formErrors.ventas}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">¿Cuándo te gustaría vender? *</label>
                  <div className="relative">
                    <select
                      name="timing"
                      value={formData.timing}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-500 appearance-none"
                    >
                      <option value="">Selecciona timing</option>
                      <option value="este-ano">Este año</option>
                      <option value="proximo-ano">Próximo año</option>
                      <option value="2-3-anos">En 2-3 años</option>
                      <option value="explorando">Solo exploro opciones</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {formErrors.timing && <p className="text-red-400 text-sm mt-1">{formErrors.timing}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Cuéntanos más sobre tu empresa</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-500 resize-vertical"
                  placeholder="Describe brevemente tu empresa, qué la hace especial, logros destacados, etc."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                         px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-700
                         transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Enviar solicitud de contacto
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-gray-300">
                Compramos empresas exitosas en Chile con un proceso transparente y profesional.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  contacto@atlaspartners.cl
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  +56 9 XXXX XXXX
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  Santiago, Chile
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-gray-300">
                <p>Política de Privacidad</p>
                <p>Términos y Condiciones</p>
                <p className="text-sm text-gray-400 mt-4">
                  © 2025 Atlas Partners - Todos los derechos reservados
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20saber%20más%20sobre%20la%20compra%20de%20mi%20empresa"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full 
                 shadow-lg transition-all duration-1000 transform hover:scale-110 z-50"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
};

export default Index;
