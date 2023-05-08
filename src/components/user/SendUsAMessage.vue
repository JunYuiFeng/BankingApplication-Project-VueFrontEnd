<template>
  <div id="firstCart" class="text-center">
    <br /><br /><br />
    <h1>Let's Talk.</h1>
    <h3>Share your excitement with us.</h3>
    <br />
    <form class="myForm" @submit.prevent="submitForm">
      <div class="form-field">
        <label>Name:</label>
        <input
          v-model="formData.name"
          required
          type="text"
          placeholder="Enter your name!"
        />
      </div>
      <div class="form-field">
        <label>Email:</label>
        <input
          v-model="formData.email"
          required
          type="email"
          placeholder="Enter email"
        />
      </div>
      <div class="textArea" style="padding: 2">
        <label>Your Message:</label>
        <textarea
          v-model="formData.message"
          required
          type="message"
          placeholder="Enter your message here!"
        ></textarea>
      </div>
      <div class="form-field">
        <button id="myBtn" type="submit" class="btn btn-primary">Send</button>
      </div>
      <br /><br />
    </form>
    <div
      v-if="message"
      :class="{
        alert: true,
        'alert-success': status == 'success',
        'alert-danger': status == 'error',
      }"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
      message: "",
      status: "",
    };
  },
  methods: {
    submitForm() {
      fetch("/sendUsAMessage", {
        method: "POST",
        body: JSON.stringify(this.formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            this.status = "success";
            this.message = "Message sent successfully";
          } else {
            this.status = "error";
            this.message = "Error sending message";
          }
        })
        .catch((error) => {
          this.status = "error";
          this.message = "Error sending message";
        });
    },
  },
};
</script>
<style>
/* Body styles */
.body {
  background-color: #f8f9fa;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

/* Navbar styles */
.navbar {
  background-color: #4caf50;
  color: #fff;
}

.nav-link {
  color: #fff !important;
}

/* Form styles */
.myForm {
  margin: 0 auto;
  max-width: 500px;
}

.form-field {
  margin-bottom: 1rem;
}

.form-field label {
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-field input,
.form-field textarea {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-field input:focus,
.form-field textarea:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.textArea label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.textArea textarea {
  min-height: 200px;
}

/* Button styles */
.btn-primary {
  color: #fff;
  background-color: #4caf50;
  border-color: #4caf50;
}

.btn-primary:hover {
  color: #fff;
  background-color: #3e8e41;
  border-color: #3e8e41;
}
</style>
