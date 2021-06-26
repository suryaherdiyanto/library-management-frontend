<template>
    <div class="section">
        <div class="columns is-justify-content-center">
            <div class="column is-4">
                <div class="box p-5">
                    <h3 class="title is-3 has-text-centered">Login To Admin</h3>
                    <b-alert v-model="response.isError" @dismiss="dismissAlert" variant="danger" :title="response.error.status" :message="response.error.message"></b-alert>
                    <form @submit.prevent="login">
                        <div class="field is-error">
                            <div class="label" for="email">Email</div>
                            <div class="control">
                                <input 
                                    v-model="form.email" 
                                    :class="{ 'is-danger': (!validation.fields.email.isValid && validation.fields.email.errorMessage), 'is-success': validation.fields.email.isValid }" 
                                    id="email" 
                                    type="text" 
                                    class="input" 
                                    placeholder="Enter your email here" 
                                    @keyup="validateField('email')"
                                    @blur="checkFormValid">
                            </div>
                            <p class="help is-danger" v-if="validation.fields.email.errorMessage !== '' ">{{ validation.fields.email.errorMessage }}</p>
                        </div>
                        <div class="field">
                            <div class="label" for="password">Password</div>
                            <div class="control">
                                <input v-model="form.password" id="password" type="password" class="input" placeholder="Enter your password here">
                            </div>
                        </div>
                        <div class="field has-text-right">
                            <button class="button is-primary" :class="{'is-loading': processingState}" type="submit" :disabled="!isFormValid">Sign-in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BAlert from '../components/BAlert.vue';

export default {
    components: {
        BAlert
    },
    data() {
        return {
            isFormValid: false,
            form: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState(['processingState', 'isLoggedin', 'validation', 'response'])
    },
    methods: {
        validateField(field) {
            
            const errors = this.$validateSingle(this.form[field], {
                presence: true,
                email: true
            });

            if (errors && errors.length > 0) {

                this.$store.commit('FILL_ERROR', {
                    field: 'email',
                    message: errors[0]
                } );
                this.$store.commit('VALIDATION_FIELD_ERROR', 'email');
            } else {
                this.$store.commit('VALIDATION_FIELD_COMPLETE', 'email');
            }
        },
        checkFormValid() {
            this.isFormValid = this.$store.getters.isValidationComplete;
        },
        login() {
            this.$store.commit('CLEAN_RESPONSE');
            this.$store.commit('PROCESSING');
            const { email, password } = this.form;

            this.$axios.post('api/login', { email, password }).then((response) => {
                this.$store.commit('PROCESSED');

                if (response.status_code === 400) {
                    this.$store.commit('RESPONSE_ERROR', response.data);
                    return;
                }

                this.$store.commit('SET_TOKEN', response.data.token);
                this.$store.commit('LOGIN');
            }).catch((error) => {
                this.$store.commit('PROCESSED');
                if (error.response.status_code === 400) {
                    this.$store.commit('RESPONSE_ERROR', error.response.data);
                    return;
                }

                this.$store.commit('RESPONSE_ERROR', error.response.data);
            });
        },
        dismissAlert() {
            this.$store.commit('CLEAN_RESPONSE');
        }
    },
    created() {
        this.$store.commit('INIT_VALIDATION', ['email']);
    }
}
</script>