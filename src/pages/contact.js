import React, { useState } from 'react'
import { TextInput, Button, Flex, Flash, StyledOcticon, Box } from '@primer/components'
import { CheckIcon, XIcon } from '@primer/octicons-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { CONTACT_PAGE_KEYWORDS } from '../lib/keywords'
import Layout from '../components/Layout'

const contactFormOptions = [
  { id: 'name', type: 'text', placeholder: 'Name', controlId: 'formName' },
  { id: 'email', type: 'email', placeholder: 'Email Address', controlId: 'formEmail' },
  { id: 'phone', type: 'tel', placeholder: 'Phone Number', controlId: 'formPhone' },
  { id: 'message', type: 'text', placeholder: 'Message', controlId: 'formMessage', asType: 'textarea' },
]

// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const Contact = () => {
  const [ formSubmit, setFormSubmit ] = useState( false )
  const [ submissionSuccess, setSubmissionSuccess ] = useState( false )

  const formik = useFormik( {
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },

    validationSchema: Yup.object().shape( {
      name: Yup.string()
        .min( 2, 'Names must have at least 2 characters' )
        .max( 100, "Names can't be longer than 100 characters" )
        .required( 'Name is required' ),
      email: Yup.string()
        .email( 'Must be a valid email address' )
        .max( 100, 'Email must be less than 100 characters' )
        .required( 'Email is required' ),
      phone: Yup.string()
        .matches( phoneRegExp, 'Phone number is not valid' )
        .min( 10 )
        .required( 'Phone number is required' ),
      message: Yup.string()
        .min( 10, 'Too Short! Tell us more' )
        .required( 'Message is required' ),
    } ),

    onSubmit: values => {
      const postRequest = {
        name: values.name,
        from_email: values.email,
        to_email: 'saihajpreet.singh@gmail.com',
        phone: values.phone,
        subject: 'Contact Form: Chandigarh Gatka Association',
        message: values.message,
      }

      // Make call to serverless code
      fetch( 'https://emailtheform.azurewebsites.net/api/EmailTheForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( postRequest ),
      } )
        .then( response => {
          setFormSubmit( true )
          if ( response.ok ) setSubmissionSuccess( true )
        } )
    },
  } )

  const renderContent = () => {
    // Display Form
    if ( !formSubmit ) {
      return (
        <Flex as="form" onSubmit={formik.handleSubmit} flexDirection="column">
          {contactFormOptions.map( ( { id, placeholder, name, asType } ) => (
            <div key={id}>
              <TextInput
                name={name}
                as={asType}
                width="100%"
                marginBottom={2}
                aria-label={placeholder}
                placeholder={placeholder}
                {...formik.getFieldProps( id )}
                variant="large"
              />

              {/* Validation Errors */}
              {formik.touched[ id ] && formik.errors[ id ] ? (
                <Flash
                  mt={-2}
                  mb={3}
                  py={0}
                  px={3}
                  variant="danger"
                >
                  <StyledOcticon icon={XIcon} />
                  {formik.errors[ id ]}
                </Flash>
              ) : null}

            </div>
          ) )}

          <Button
            type="submit"
            disabled={formik.isSubmitting}
          >
            Submit Form
          </Button>

        </Flex>
      )
    }

    // Response was sent
    if ( submissionSuccess ) {
      return (
        <Flash as="h3" py={4} px={4} variant="success">
          <StyledOcticon icon={CheckIcon} size={22} />
          We will get back to you soon!
        </Flash>
      )
    }

    // Failed to send response
    return (
      <Flash as="h3" py={4} px={4} variant="danger">
        <StyledOcticon icon={XIcon} size={22} />
        There was an error. Please try again!!!
      </Flash>
    )
  }

  return (
    <Layout title="Contact" mx="auto" px={[ 2, 4 ]} keywords={CONTACT_PAGE_KEYWORDS}>
      <Box as="h3" mb={6} mt={[ -2, 2 ]} style={{ fontWeight: 500 }}>
        Want to get in touch? Fill out the form below to send us a
        message and we will get back to you!
      </Box>
      {renderContent()}
    </Layout>
  )
}

export default Contact
