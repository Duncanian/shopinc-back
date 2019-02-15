import encPass from '../../helpers/Encrypt';

const hashedPass = encPass.generateHash('Aa123!!!');

const user = {
  user1: {
    username: '',
    email: 'test@test.com',
    password: 'Aa123!',
  },
  user2: {
    username: 'tester',
    email: '',
    password: 'Aa123!',
  },
  user3: {
    username: 'tester',
    email: 'test@test.com',
    password: '',
  },
  user4: {
    username: 'te',
    email: 'test@test.com',
    password: 'Aa123!',
  },
  user5: {
    username: 'tester',
    email: 'testtest.com',
    password: 'Aa123!',
  },
  user6: {
    username: 'tester',
    email: 'test@test.com',
    password: '123!!!',
  },
  user7: {
    username: 'tester',
    email: 'test@tester.com',
    password: 'Aa123!!!',
  },
};

export const userExist = [
  {
    username: 'tester',
    email: 'test@test.com',
    password: hashedPass,
  },
];

export const userLogin = {
  user1: {
    email: 'test@test.co.ke',
    password: 'Aa123!!!',
  },
  user2: {
    email: 'test@test.com',
    password: 'Aa123!',
  },
  user3: {
    email: 'test@test.com',
  },
  user4: {
    email: 'test@test.com',
    password: 'Aa123!!!',
  },
};

export default user;
