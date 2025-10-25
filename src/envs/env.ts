export const env = {
  production: true,
  baseUrl: 'http://localhost:8081/',
  // baseUrl: 'https://ec2-3-108-60-193.ap-south-1.compute.amazonaws.com:8081/',

  cognito: {
    UserPoolId: 'ap-southeast-1_b3yobnSft',
    ClientId: '20ejocv00ot2o71dhdc2q3uod1',
    domain:
      'https://ap-southeast-1bh7ci5mhi.auth.ap-southeast-1.amazoncognito.com',
    redirectSignIn: 'https://develop.d1cys2ga1ab351.amplifyapp.com/',
    redirectSignOut: 'https://develop.d1cys2ga1ab351.amplifyapp.com/',
    responseType: 'code',
  },
};
