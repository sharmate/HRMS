import { async, TestBed } from '@angular/core/testing'
import { CustomPipeModule } from './custom-pipe.module'

describe('CustomPipeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomPipeModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(CustomPipeModule).toBeDefined()
  })
})
