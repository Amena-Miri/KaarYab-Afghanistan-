'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { 
  Mail, 
  Phone, 
  MapPin as MapPinIcon,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageCircle,
} from 'lucide-react';

import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: 'Address',
      details: 'Kabul, Afghanistan',
      description: 'Visit our office for inquiries'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+93 700 000 000',
      description: 'Mon-Fri 9AM-5PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@kaaryab.com',
      description: 'We\'ll respond within 24 hours'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: '9:00 AM - 5:00 PM',
      description: 'Saturday - Thursday'
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about opportunities or need help? We're here to support you on your career journey.
          </p>
        </motion.div>

        {/* Contact Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 text-center group hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {info.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {info.details}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {info.description}
              </p>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4"
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                    className="mt-2"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          {/* Social & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Connect With Us
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                    Social Media
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 transition-all ${social.color} hover:text-white`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                    Quick Response
                  </h3>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-300">
                        We typically respond within 24 hours
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        For urgent matters, please call our office
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                    Office Location
                  </h3>
                  <div className="relative h-48 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPinIcon className="w-12 h-12 text-primary opacity-50" />
                      <span className="ml-2 text-gray-600 dark:text-gray-400 font-medium">
                        Kabul, Afghanistan
                      </span>
                    </div>
                    {/* You can replace this with an actual map component */}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  How do I apply for opportunities?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Browse opportunities and click the "Apply Now" button on any opportunity page.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is KaarYab free to use?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Yes, KaarYab is completely free for job seekers and opportunity seekers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  How can I save opportunities?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Click the bookmark icon on any opportunity to save it to your profile.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Who can post opportunities?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Organizations and individuals can post opportunities through our platform.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;