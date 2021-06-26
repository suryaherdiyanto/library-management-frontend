<template>
    <article v-if="modelValue" class="message" :class="{'is-danger': isDanger,'is-success': isSuccess,'is-info': isInfo,'is-warning':isWarning}">
        <div class="message-header">
            <strong>{{ title }}</strong>
            <button class="delete" @click.prevent="dismiss"></button>
        </div>
        <div class="message-body">
            {{ message }}
        </div>
    </article>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Message'
        },
        message: {
            type: String,
            default: ''
        },
        variant: {
            type: String,
            default: 'success'
        },
        modelValue: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isShow: true,
            isDanger: false,
            isSuccess: false,
            isWarning: false,
            isInfo: false
        }
    },
    methods: {
        dismiss() {
            this.$emit('dismiss');
        }
    },
    created() {
        switch (this.variant) {
            case 'success':
                this.isSuccess = true;
                break;
            case 'danger':
                this.isDanger = true;
                break;
            case 'warning':
                this.isWarning = true;
                break;
        
            default:
                this.isInfo = true;
                break;
        }
    }
}
</script>