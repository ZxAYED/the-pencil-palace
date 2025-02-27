'use strict'

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.verifyPayment = exports.makePayment = void 0
const Shurjopay_1 = __importDefault(require('shurjopay'))
const config_1 = __importDefault(require('../../config'))
const shurjopay = new Shurjopay_1.default()
shurjopay.config(
  config_1.default.SP_ENDPOINT,
  config_1.default.SP_USERNAME,
  config_1.default.SP_PASSWORD,
  config_1.default.SP_PREFIX,
  config_1.default.SP_RETURN_URL,
)
const makePayment = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      shurjopay.makePayment(
        payload,
        response => {
          resolve(response)
        },
        error => {
          reject(error)
        },
      )
    })
  })
exports.makePayment = makePayment
const verifyPayment = orderId =>
  __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      shurjopay.verifyPayment(
        orderId,
        response => {
          resolve(response)
        },
        error => {
          reject(error)
        },
      )
    })
  })
exports.verifyPayment = verifyPayment
