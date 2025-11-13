---
layout: page
title: Kontak
permalink: /kontak/
body_class: page-kontak
---

<h1 class="title is-2">Kontak</h1>
<p class="subtitle is-5">
  Saya terbuka untuk diskusi, kolaborasi penelitian, atau pertanyaan terkait bidang keahlian saya. Silakan hubungi saya melalui saluran yang paling nyaman bagi Anda.
</p>

<div class="columns is-multiline">

  <div class="column is-half">
    <div class="box contact-box">
      <article class="media">
        <div class="media-left">
          <span class="icon is-large has-text-primary">
            <i class="fas fa-university fa-2x"></i>
          </span>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>Email (Urusan Kampus)</strong>
              <br>
              <a href="mailto:{{ site.email_kampus }}">{{ site.email_kampus }}</a>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>

  <div class="column is-half">
    <div class="box contact-box">
      <article class="media">
        <div class="media-left">
          <span class="icon is-large has-text-primary">
            <i class="fas fa-envelope fa-2x"></i>
          </span>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>Email (Pribadi / Luar Kampus)</strong>
              <br>
              <a href="mailto:{{ site.email_pribadi }}">{{ site.email_pribadi }}</a>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>

  <div class="column is-half">
    <div class="box contact-box">
      <article class="media">
        <div class="media-left">
          <span class="icon is-large has-text-primary">
            <i class="fab fa-whatsapp fa-2x"></i>
          </span>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>Telepon & WhatsApp</strong>
              <br>
              <a href="https://wa.me/{{ site.telepon }}" target="_blank" rel="noopener noreferrer">{{ site.telepon }}</a>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>

  <div class="column is-half">
    <div class="box contact-box">
      <article class="media">
        <div class="media-left">
          <span class="icon is-large has-text-primary">
            <i class="fab fa-linkedin fa-2x"></i>
          </span>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>LinkedIn</strong>
              <br>
              <a href="{{ site.socials.linkedin }}" target="_blank" rel="noopener noreferrer">dennyrwa</a>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>

</div>